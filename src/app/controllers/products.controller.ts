import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ProductsService } from "../services/product.service";
import { ProductModel } from "src/domain/models/product.model";
import { GetByCodeDto } from "../dto/products.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(":code")
  @HttpCode(200)
  async getBycode(@Param() getByCodeDto: GetByCodeDto): Promise<ProductModel> {
    return this.productsService.getBycode(getByCodeDto.code);
  }
}
