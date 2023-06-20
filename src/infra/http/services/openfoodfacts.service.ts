import { ConfigService } from "@nestjs/config";
import { OpenFoodFactInterface } from "../interfaces/openfoodfacts.interface";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OpenFoodFactService implements OpenFoodFactInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getAvailableFileNames(): Promise<any> {
    const { data } = await lastValueFrom(
      this.httpService.get(
        `${this.configService.get("AVAILABLE_FILENAMES_URL")}`
      )
    );

    return data;
  }
  async getFile(filename: string): Promise<any> {
    const { data } = await lastValueFrom(
      this.httpService.get(
        `${this.configService.get("FILENAME_URL")}${filename}`,
        { responseType: "arraybuffer" }
      )
    );

    return data;
  }
}
