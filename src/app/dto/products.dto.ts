import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";
import { ProductModel, StatusEnum } from "src/domain/models/product.model";

export class GetByCodeDto {
  @ApiProperty()
  @IsNumberString()
  code: string;
}

export class GetProductsDto {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  skip?: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  take?: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  creator?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  created_t?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  last_modified_t?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  product_name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  quantity?: string;

  @ApiPropertyOptional({})
  @IsString()
  @IsOptional()
  brands?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categories?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  labels?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cities?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  purchase_places?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  stores?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ingredients_text?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  traces?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  serving_size?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  serving_quantity?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nutriscore_score?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nutriscore_grade?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  main_category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image_url?: string;
}

export class ProductResponseOkDto implements ProductModel {
  @ApiProperty()
  code: string;

  @ApiProperty()
  status: StatusEnum;

  @ApiProperty()
  imported_t: Date;

  @ApiProperty()
  url: string;

  @ApiProperty()
  creator: string;

  @ApiProperty()
  created_t: string;

  @ApiProperty()
  last_modified_t: string;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  brands: string;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  labels: string;

  @ApiProperty()
  cities: string;

  @ApiProperty()
  purchase_places: string;

  @ApiProperty()
  stores: string;

  @ApiProperty()
  ingredients_text: string;

  @ApiProperty()
  traces: string;

  @ApiProperty()
  serving_size: string;

  @ApiProperty()
  serving_quantity: string;

  @ApiProperty()
  nutriscore_score: string;

  @ApiProperty()
  nutriscore_grade: string;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  image_url: string;
}

export class ProductResponseErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: [];
}
