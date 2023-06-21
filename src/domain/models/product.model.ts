import { ApiProperty } from "@nestjs/swagger";

export enum StatusEnum {
  trash = "trash",
  draft = "draft",
  published = "published",
}

export interface ProductModel {
  code: string;
  status: StatusEnum;
  imported_t?: Date;
  url: string;
  creator: string;
  created_t: string;
  last_modified_t: string;
  product_name: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: string;
  nutriscore_score: string;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}
