import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products-repository.interface";
import { OpenFoodFactInterface } from "src/infra/http/interfaces/openfoodfacts.interface";
import * as zlib from "zlib";
import * as fs from "fs";
import * as readline from "readline";
import { Readable } from "stream";
import { handleProducts } from "src/infra/http/adapters/products.adapter";
import { FilesManagerRepositoryInterface } from "src/domain/repositories/interfaces/files-manager-repository.interface";

@Injectable()
export class JobService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private readonly productsRepository: ProductsRepositoryInterface,
    @Inject("OPEN_FOOD_FACT_SERVICE")
    private readonly openFoodFactService: OpenFoodFactInterface,
    @Inject("FILES_MANAGER_REPOSITORY")
    private filesManagerRepository: FilesManagerRepositoryInterface
  ) {}

  @Cron("*/5 * * * * *")
  async init() {
    const availableFiles =
      await this.openFoodFactService.getAvailableFileNames();
    const filename = availableFiles[0];
    const data = await this.openFoodFactService.getFile(filename);
    const decompressedBuffer = zlib.unzipSync(data);
    filename.replace(".gz", "");
    const pathToSaveReducedFile = `files/filesToProcess/${filename}`;
    const fileToProcess = pathToSaveReducedFile;
    await this.bufferToJson(decompressedBuffer, `files/${filename}`);
    let startLine = 1;
    let endLine = 0;

    const fileManager = await this.filesManagerRepository.getByFilename(
      filename
    );

    if (fileManager) {
      startLine = fileManager.state;
      endLine = startLine + 100;
    }

    await this.writeFilesToProcess(
      filename,
      `files/filesToProcess/${filename}`,
      startLine,
      endLine
    );

    return handleProducts(await this.getFilesToProcess(fileToProcess));
  }

  bufferToJson(buffer: Buffer, localToSave: string) {
    return new Promise((resolve, reject) => {
      let offset = 0;

      fs.writeFileSync(localToSave, "");
      const writableStream = fs.createWriteStream(localToSave);
      const chunks = [];

      const readableStream = new Readable({
        highWaterMark: 1024,
        read(size) {
          const chunk = buffer.slice(offset, offset + size);
          offset += chunk.length;
          this.push(chunk.length > 0 ? chunk : null);
        },
        encoding: "utf-8",
      });

      readableStream.on("data", (chunk) => {
        writableStream.write(chunk);
      });

      readableStream.on("end", () => {
        writableStream.end();
        resolve(chunks);
      });

      readableStream.on("error", (err) => {
        reject(err);
      });
    });
  }

  writeFilesToProcess(
    fileToReduce: string,
    pathToSaveReducedFile: string,
    startLine: number,
    endLine: number
  ) {
    return new Promise((resolve) => {
      fs.writeFileSync(pathToSaveReducedFile, "");

      const lines = [];
      let actualLine = 0;

      const writableStream = fs.createWriteStream(pathToSaveReducedFile);
      const readStream = fs.createReadStream(fileToReduce);
      const readLine = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      readLine.on("line", (line) => {
        if (actualLine >= startLine && actualLine < endLine) {
          lines.push(line);
          writableStream.write(`${line}\n`);
        }
        actualLine++;
      });

      readLine.on("close", () => {
        writableStream.end();
        readLine.close();
        resolve(lines);
      });
    });
  }

  getFilesToProcess(filePathToProcess: string) {
    return new Promise((resolve) => {
      const json = [];
      const readStream = fs.createReadStream(filePathToProcess);
      const readLine = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      readLine.on("line", (line) => {
        json.push(JSON.parse(line));
      });

      readLine.on("close", () => {
        readLine.close();
        resolve(json);
      });
    });
  }
}
