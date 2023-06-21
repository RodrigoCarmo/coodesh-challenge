import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetByCodeDto {
  @IsNumberString()
  code: string;
}

export class GetProductsDto {
  @IsNumberString()
  @IsOptional()
  skip?: string;
  @IsNumberString()
  @IsOptional()
  take?: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsString()
  @IsOptional()
  created_t?: string;

  @IsString()
  @IsOptional()
  last_modified_t?: string;

  @IsString()
  @IsOptional()
  product_name?: string;

  @IsString()
  @IsOptional()
  quantity?: string;

  @IsString()
  @IsOptional()
  brands?: string;

  @IsString()
  @IsOptional()
  categories?: string;

  @IsString()
  @IsOptional()
  labels?: string;

  @IsString()
  @IsOptional()
  cities?: string;

  @IsString()
  @IsOptional()
  purchase_places?: string;

  @IsString()
  @IsOptional()
  stores?: string;

  @IsString()
  @IsOptional()
  ingredients_text?: string;

  @IsString()
  @IsOptional()
  traces?: string;

  @IsString()
  @IsOptional()
  serving_size?: string;

  @IsString()
  @IsOptional()
  serving_quantity?: string;

  @IsString()
  @IsOptional()
  nutriscore_score?: string;

  @IsString()
  @IsOptional()
  nutriscore_grade: string;

  @IsString()
  @IsOptional()
  main_category: string;

  @IsString()
  @IsOptional()
  image_url: string;
}
