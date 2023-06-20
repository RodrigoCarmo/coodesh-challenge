import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products-repository.interface";
import * as zlib from "zlib";
import * as fs from "fs";
import * as readline from "readline";
import { Readable } from "stream";
import { handleProducts } from "src/infra/http/adapters/products.adapter";
import { FilesManagerRepositoryInterface } from "src/domain/repositories/interfaces/files-manager-repository.interface";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productsRepository: ProductsRepositoryInterface,
    @Inject("FILES_MANAGER_REPOSITORY")
    private filesManagerRepository: FilesManagerRepositoryInterface,
    private readonly httpService: HttpService
  ) {}

  // bufferToJson(buffer: Buffer, localToSave: string) {
  //   return new Promise((resolve, reject) => {
  //     let offset = 0;

  //     fs.writeFileSync(localToSave, "");
  //     const writableStream = fs.createWriteStream(localToSave);
  //     const chunks = [];

  //     const readableStream = new Readable({
  //       highWaterMark: 1024,
  //       read(size) {
  //         const chunk = buffer.slice(offset, offset + size);
  //         offset += chunk.length;
  //         this.push(chunk.length > 0 ? chunk : null);
  //       },
  //       encoding: "utf-8",
  //     });

  //     readableStream.on("data", (chunk) => {
  //       writableStream.write(chunk);
  //     });

  //     readableStream.on("end", () => {
  //       writableStream.end();
  //       resolve(chunks);
  //     });

  //     readableStream.on("error", (err) => {
  //       reject(err);
  //     });
  //   });
  // }

  // writeFilesToProcess(
  //   fileToReduce: string,
  //   pathToSaveReducedFile: string,
  //   startLine: number,
  //   endLine: number
  // ) {
  //   return new Promise((resolve) => {
  //     fs.writeFileSync(pathToSaveReducedFile, "");

  //     const lines = [];
  //     let actualLine = 0;

  //     const writableStream = fs.createWriteStream(pathToSaveReducedFile);
  //     const readStream = fs.createReadStream(fileToReduce);
  //     const readLine = readline.createInterface({
  //       input: readStream,
  //       crlfDelay: Infinity,
  //     });

  //     readLine.on("line", (line) => {
  //       if (actualLine >= startLine && actualLine < endLine) {
  //         lines.push(line);
  //         writableStream.write(`${line}\n`);
  //       }
  //       actualLine++;
  //     });

  //     readLine.on("close", () => {
  //       writableStream.end();
  //       readLine.close();
  //       resolve(lines);
  //     });
  //   });
  // }

  // getFilesToProcess(filePathToProcess: string) {
  //   return new Promise((resolve, reject) => {
  //     const json = [];
  //     const readStream = fs.createReadStream(filePathToProcess);
  //     const readLine = readline.createInterface({
  //       input: readStream,
  //       crlfDelay: Infinity,
  //     });

  //     readLine.on("line", (line) => {
  //       json.push(JSON.parse(line));
  //     });

  //     readLine.on("close", () => {
  //       readLine.close();
  //       resolve(json);
  //     });
  //   });
  // }

  async getBycode(code: number): Promise<any> {
    // const filePath = "products_01.json";
    // const buff = zlib.unzipSync(data);
    // await this.bufferToJson(buff, filePath);
    // const fileWithAllProducts = "products_01.json";
    // const reducedFile = "products_02.json";
    // const con = await this.writeFilesToProcess(
    //   fileWithAllProducts,
    //   reducedFile,
    //   1,
    //   10
    // );
    // return handleProducts(await this.getFilesToProcess(reducedFile));
  }
}
