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
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiHeader({ name: "x-api-key", required: true })
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

  @ApiHeader({ name: "x-api-key", required: true })
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

  @ApiHeader({ name: "x-api-key", required: true })
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

  @ApiHeader({ name: "x-api-key", required: true })
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
