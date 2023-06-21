import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsFilesManagerPerformance1687381626133 implements MigrationInterface {
    name = 'CreateProductsFilesManagerPerformance1687381626133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("code" character varying NOT NULL, "status" character varying NOT NULL, "imported_t" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying, "creator" character varying, "created_t" character varying, "last_modified_t" character varying, "product_name" character varying, "quantity" character varying, "brands" character varying, "categories" character varying, "labels" character varying, "cities" character varying, "purchase_places" character varying, "stores" character varying, "ingredients_text" character varying, "traces" character varying, "serving_size" character varying, "serving_quantity" character varying, "nutriscore_score" character varying, "nutriscore_grade" character varying, "main_category" character varying, "image_url" character varying, CONSTRAINT "PK_7cfc24d6c24f0ec91294003d6b8" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "files_manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying NOT NULL, "state" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f83e2f40d4080a84d898e98d6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs_performance" ("id" SERIAL NOT NULL, "total_duration" character varying NOT NULL, "cpu_usage_average" character varying NOT NULL, "memory_usage" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_659ef0c870bdfa9d4d6585ac746" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jobs_performance"`);
        await queryRunner.query(`DROP TABLE "files_manager"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
