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
  ProductResponseErrorDto,
  ProductResponseOkDto,
  UpdateProductDto,
} from "../dto/products.dto";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { RateLimit } from "nestjs-rate-limiter";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ type: ProductResponseOkDto })
  @ApiNotFoundResponse({ type: ProductResponseErrorDto })
  @ApiInternalServerErrorResponse({ type: ProductResponseErrorDto })
  @ApiParam({ name: "code" })
  @RateLimit({ points: 10, duration: 60 })
  @Get(":code")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async getBycode(@Param() getByCodeDto: GetByCodeDto): Promise<ProductModel> {
    return this.productsService.getBycode(getByCodeDto.code);
  }

  @ApiOkResponse({ type: ProductResponseOkDto, isArray: true })
  @ApiNotFoundResponse({ type: ProductResponseErrorDto })
  @ApiInternalServerErrorResponse({ type: ProductResponseErrorDto })
  @RateLimit({ points: 10, duration: 60 })
  @Get("")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async getProducts(
    @Query() getProductsDto: GetProductsDto
  ): Promise<ProductModel[]> {
    return this.productsService.getProducts(getProductsDto);
  }

  @RateLimit({ points: 10, duration: 60 })
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ProductResponseErrorDto })
  @ApiInternalServerErrorResponse({ type: ProductResponseErrorDto })
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

  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ProductResponseErrorDto })
  @ApiInternalServerErrorResponse({ type: ProductResponseErrorDto })
  @ApiResponse({ status: 304 })
  @RateLimit({ points: 10, duration: 60 })
  @Delete(":code")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async deleteProduct(@Param() getByCodeDto: GetByCodeDto): Promise<void> {
    return await this.productsService.deleteProduct(getByCodeDto);
  }
}
