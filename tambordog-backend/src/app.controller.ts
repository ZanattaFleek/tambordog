import { Controller, Delete, Get, Put, Query } from "@nestjs/common";
import { AppDataSource } from "./dataSource";
import Categoria from "./entity/Categoria";
// import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor() {} //private readonly appService: AppService

  @Get("/categoria")
  getCategoria(@Query("descricao") descricao: string): Promise<Categoria[]> {
    console.log(descricao);
    return AppDataSource.getRepository(Categoria).find({
      where: { nome: descricao },
    });
  }

  @Put("/categoria")
  putCategoria(): string {
    return "Put Cliente";
  }

  @Delete("/categoria")
  deleteCategoria(): string {
    return "Delete Cliente";
  }
}
