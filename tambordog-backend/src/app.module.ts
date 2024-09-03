import { Module } from "@nestjs/common";
import { CrudController } from "./crud.controller";
import { ProvaController } from "./controller/prova.controller";

@Module({
  imports: [],
  controllers: [CrudController, ProvaController],
  providers: [],
})
export class AppModule {}
