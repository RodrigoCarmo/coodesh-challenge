import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { OpenFoodFactInterface } from "src/infra/http/interfaces/openfoodfacts.interface";
import * as zlib from "zlib";
import * as fs from "fs";
import * as readline from "readline";
import { handleProducts } from "src/infra/http/adapters/products.adapter";

import { ProductModel } from "src/domain/models/product.model";
import {
  checkActualDateItsBiggerThanDateToPauseProcess,
  generateJsonFileFromBuffer,
  managerFileJob,
} from "src/utils/job.utils";
import { performanceResult } from "src/utils/performance";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products.repository.interface";
import { FilesManagerRepositoryInterface } from "src/domain/repositories/interfaces/files-manager.repository.interface";
import { JobPerformanceRepositoryInterface } from "src/domain/repositories/interfaces/job-performance.repository.interface";
import { JobProcessStatusEnum } from "src/domain/models/job-performance.model";

@Injectable()
export class JobService {
  logger = new Logger("JobLog");
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private readonly productsRepository: ProductsRepositoryInterface,
    @Inject("OPEN_FOOD_FACT_SERVICE")
    private readonly openFoodFactService: OpenFoodFactInterface,
    @Inject("FILES_MANAGER_REPOSITORY")
    private filesManagerRepository: FilesManagerRepositoryInterface,
    @Inject("JOB_PERFORMANCE_REPOSITORY")
    private jobPerformanceRepository: JobPerformanceRepositoryInterface
  ) {}

  @Cron("*/45 * * * * *")
  async init() {
    if (!checkActualDateItsBiggerThanDateToPauseProcess()) return;
    // memoryState used to control the processing of each file once a day
    let memoryState = Number(process.env.MEMORY_STATE);
    const availableFiles =
      await this.openFoodFactService.getAvailableFileNames();
    const filesToProcess = String(availableFiles).split("\n").filter(Boolean);
    const job = managerFileJob(filesToProcess, memoryState);

    if (job === JobProcessStatusEnum.Pause || !job) return;
    this.logger.verbose(`Importing 100 products from the file: ${job}`);
    const start = performance.now();
    let jobProcessStatus: JobProcessStatusEnum;
    await this.process(job)
      .then(() => {
        jobProcessStatus = JobProcessStatusEnum.Success;
      })
      .catch(() => {
        jobProcessStatus = JobProcessStatusEnum.Error;
      })
      .finally(async () => {
        memoryState++;
        process.env.MEMORY_STATE = String(memoryState);
        const end = performance.now();
        const pfr = await performanceResult(start, end);
        this.logger.verbose(`File processed with ${jobProcessStatus} \n
      Performance:
      total_duration: ${pfr.total_duration} 
      cpu_usage_average: ${pfr.cpu_usage_average}
      memory_usage: ${pfr.memory_usage} 
      `);
        await this.jobPerformanceRepository.create(pfr, jobProcessStatus);
      });
  }

  async process(filename: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.openFoodFactService.getFile(filename);
        const decompressedBuffer = zlib.unzipSync(data);
        filename = filename.replace(".gz", "");
        await generateJsonFileFromBuffer(decompressedBuffer, filename);
        await this.insertProducts(filename);
        fs.unlink(filename, (err) => {
          if (err) this.logger.warn(`Unable to remove file: ${filename}`);
          this.logger.verbose(`File removed: ${filename}`);
        });
        resolve("");
      } catch (error) {
        reject(error);
        this.logger.error(
          `An error occurred when trying to import the products from the file ${filename}, rollback operation performed `
        );
      }
    });
  }

  async insertProducts(filename: string) {
    try {
      let startLine = 0;
      let endLine = 100;
      const fileManager = await this.filesManagerRepository.getByFilename(
        filename
      );
      if (!fileManager) {
        await this.filesManagerRepository.create(filename);
      } else {
        startLine = fileManager.state;
        endLine = startLine + 100;
      }

      const products = await this.getProductsToProcess(
        filename,
        startLine,
        endLine
      );

      await this.productsRepository.insertProducts(products, filename, endLine);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductsToProcess(
    filename: string,
    startLine: number,
    endLine: number
  ): Promise<ProductModel[]> {
    return new Promise((resolve) => {
      const products = [];
      let actualLine = 0;

      const readStream = fs.createReadStream(filename);
      const readLine = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      readLine.on("line", (line) => {
        if (actualLine >= startLine && actualLine < endLine) {
          products.push(JSON.parse(line));
        }
        actualLine++;
      });

      readLine.on("close", () => {
        readLine.close();
        handleProducts(products);
        resolve(handleProducts(products));
      });
    });
  }
}
