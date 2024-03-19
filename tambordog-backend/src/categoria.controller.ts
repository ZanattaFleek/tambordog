import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AppDataSource } from "./dataSource";
import Categoria from "./entity/Categoria";
import { Like } from "typeorm";
import { RespostaPadraoInterface } from "./interfaces/padrao.interfaces";
import { CategoriaInterface } from "./interfaces/categoria.interfaces";
import ClsCategoriaController from "./categoria.controller.cls";
// import { AppService } from "./app.service";

@Controller()
export class CategoriaController {
  constructor() {} //private readonly appService: AppService

  @Post("incluir")
  incluirGenerico(
    @Body("dados") dados: Record<string, any>,
    @Body("entidade") entidade: string
  ): Promise<RespostaPadraoInterface<any>> {
    return new ClsCategoriaController().incluir(dados, entidade);
  }

  @Put("alterar")
  alterarGenerico(
    @Body("dados") dados: Record<string, any>,
    @Body("entidade") entidade: string
  ): Promise<RespostaPadraoInterface<any>> {
    return new ClsCategoriaController().incluir(dados, entidade);
  }

  @Delete("excluir")
  excluirGenerico(
    @Body("entidade") entidade: string,
    @Body("criterio") criterio: Record<string, any>
  ): Promise<RespostaPadraoInterface<any>> {
    return new ClsCategoriaController().excluir(entidade, criterio);
  }

  /*
  @Get("categoria")
  getCategoria(@Query("descricao") descricao: string): Promise<Categoria[]> {
    return AppDataSource.getRepository(Categoria).find({
      where: {
        nome: Like("%".concat(descricao).concat("%")),
      },
    });
  }

  @Put("/categoria")
  putCategoria(): string {
    return "Put Pedro Categoria";
  }

  @Delete("/categoria")
  deleteCategoria(): string {
    return "Delete Categoria";
  }
  */
}
