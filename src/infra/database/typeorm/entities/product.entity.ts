import { ProductModel, StatusEnum } from "src/domain/models/product.model";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("products")
export class ProductEntity implements ProductModel {
  @PrimaryColumn()
  code: string;

  @Column({ enum: StatusEnum })
  status: StatusEnum;

  @CreateDateColumn()
  imported_t: Date;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  creator: string;

  @Column({ nullable: true })
  created_t: string;

  @Column({ nullable: true })
  last_modified_t: string;

  @Column({ nullable: true })
  product_name: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ nullable: true })
  brands: string;

  @Column({ nullable: true })
  categories: string;

  @Column({ nullable: true })
  labels: string;

  @Column({ nullable: true })
  cities: string;

  @Column({ nullable: true })
  purchase_places: string;

  @Column({ nullable: true })
  stores: string;

  @Column({ nullable: true })
  ingredients_text: string;

  @Column({ nullable: true })
  traces: string;

  @Column({ nullable: true })
  serving_size: string;

  @Column({ nullable: true })
  serving_quantity: string;

  @Column({ nullable: true })
  nutriscore_score: string;

  @Column({ nullable: true })
  nutriscore_grade: string;

  @Column({ nullable: true })
  main_category: string;

  @Column({ nullable: true })
  image_url: string;
}
