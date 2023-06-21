import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseFilters,
} from "@nestjs/common";
import { ProductsService } from "../services/product.service";
import { ProductModel } from "src/domain/models/product.model";
import {
  GetByCodeDto,
  GetProductsDto,
  UpdateProductDto,
} from "../dto/products.dto";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(":code")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async getBycode(@Param() getByCodeDto: GetByCodeDto): Promise<ProductModel> {
    return this.productsService.getBycode(getByCodeDto.code);
  }

  @Get("")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async getProducts(
    @Query() getProductsDto: GetProductsDto
  ): Promise<ProductModel[]> {
    return this.productsService.getProducts(getProductsDto);
  }

  @Put(":code")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async updateProduct(
    @Param() getByCodeDto: GetByCodeDto,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<void> {
    return await this.productsService.updateProduct(
      getByCodeDto,
      updateProductDto
    );
  }

  @Delete(":code")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async deleteProduct(@Param() getByCodeDto: GetByCodeDto): Promise<void> {
    return await this.productsService.deleteProduct(getByCodeDto);
  }
}
