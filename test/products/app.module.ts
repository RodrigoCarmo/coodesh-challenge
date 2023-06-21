import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductsMockModule } from "./modules/products.module";

@Module({
  imports: [ProductsMockModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModuleMock {}
