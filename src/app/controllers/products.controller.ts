import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ProductsService } from "../services/product.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(":code")
  @HttpCode(200)
  async getBycode(@Param() code: number): Promise<any> {
    return this.productsService.getBycode(code);
  }
}
