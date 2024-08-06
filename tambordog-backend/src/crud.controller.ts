import { Body, Controller, Delete, Post, Put } from "@nestjs/common";
import { RespostaPadraoInterface } from "./interfaces/padrao.interfaces";
import ClsCategoriaController from "./crud.controller.cls";

@Controller()
export class CrudController {
  constructor() { } //private readonly appService: AppService

  @Post("incluir")
  incluirGenerico(
    @Body("criterio") criterio: Record<string, any>,
    @Body("entidade") entidade: string
  ): Promise<RespostaPadraoInterface<any>> {
    return new ClsCategoriaController().incluir(criterio, entidade);
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
    @Body("camposLike") camposLike: Array<string>,
    @Body("select") select: Array<string>,
    @Body("relations") relations: Array<string>
  ): Promise<RespostaPadraoInterface<any>> {
    return new ClsCategoriaController().consultar({
      entidade: entidade,
      criterio: criterio,
      camposLike: camposLike ? camposLike : [],
      select: select ? select : [],
      relations: relations ? relations : []
    });
  }
}
