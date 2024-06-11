import { Module } from "@nestjs/common";
import { CrudController } from "./crud.controller";

@Module({
  imports: [],
  controllers: [CrudController],
  providers: [],
})
export class AppModule {}
