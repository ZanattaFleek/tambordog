import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { RespostaPadraoInterface } from "./interfaces/padrao.interfaces";
import ClsCategoriaController from "./crud.controller.cls";
import { Resolver } from "dns";
import { Roles } from "./decorators/roles.decorators";
import { SISTEMA_PERMISSOES } from "./types/PermissaoTypes";
import { RolesGuard } from "./roles.guard";
import { Contexto } from "./decorators/contexto.decorators";

@Controller()
export class CrudController {
  constructor() { } //private readonly appService: AppService

  @Post("Teste")
  @Roles([{
    modulo: SISTEMA_PERMISSOES.PROVAS.MODULO,
    permissao: SISTEMA_PERMISSOES.PROVAS.PERMISSOES.LISTAR_PROVAS_EM_ABERTO
  }])
  teste(): string {
    return "Teste"
  }

  @Post("incluir")
  @Roles([{
    modulo: SISTEMA_PERMISSOES.CRUD_GENERICO.MODULO,
    permissao: SISTEMA_PERMISSOES.CRUD_GENERICO.PERMISSOES.INCLUIR
  }])
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
