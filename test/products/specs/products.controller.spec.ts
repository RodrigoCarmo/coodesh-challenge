import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ProductsMockModule } from "../modules/products.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {
  products,
  responseWithPaginationDefault,
  responseWithPaginationSendByQuery,
} from "../constants/products.constants";

describe("AppController", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsMockModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/products:code (GET) should be able to get a product by code", async () => {
    await request(app.getHttpServer())
      .get(`/products/${products[0].code}`)
      .expect(200)
      .expect(products[0]);
  });

  it("/products:code (GET) should not be able to get a product by unexisting code", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/products/1234567812345678`)
      .expect(404);

    expect(body).toHaveProperty("message", ["Product not found"]);
  });

  it("/products (GET) should be able to get products with pagination passed by param", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/products?skip=1&take=4`)
      .expect(200);

    expect(body).toEqual(responseWithPaginationSendByQuery);
  });

  it("/products (GET) should be able to get products with pagination with default pagination", async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/products`)
      .expect(200);

    expect(body).toEqual(responseWithPaginationDefault);
  });

  it("/products:code (PUT) should be able to update a product", async () => {
    await request(app.getHttpServer())
      .put(`/products/${products[0].code}`)
      .send({
        creator: "Tester",
      })
      .expect(200);

    const productUpdated = await request(app.getHttpServer())
      .get(`/products/${products[0].code}`)
      .expect(200)
      .expect(products[0]);
    expect(productUpdated.body).toHaveProperty("creator", "Tester");
  });

  it("/products (DELETE) should be able to delete a product by code", async () => {
    await request(app.getHttpServer())
      .delete(`/products/0000000000123`)
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .get(`/products/0000000000123`)
      .expect(404);

    expect(body).toHaveProperty("message", ["Product not found"]);
  });
});
