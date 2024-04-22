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

  @Post("consultar")
  getCategoria(
    @Body("entidade") entidade: string,
    @Body("criterio") criterio: Record<string, any>,
    @Body("camposLike") camposLike: Array<string>
  ): Promise<RespostaPadraoInterface<any>> {
    console.log("====================");
    console.log("Parametros do GetCategoria");
    console.log("====================");
    console.log("Criterio: ", criterio);
    console.log("entidade: ", entidade);
    console.log("camposLIke: ", camposLike);
    console.log("====================");
    return new ClsCategoriaController().consultar({
      entidade: entidade,
      criterio: criterio,
      camposLike: camposLike ? camposLike : [],
    });
  }

  /*
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
