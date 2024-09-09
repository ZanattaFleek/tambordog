import { AppDataSource } from "./dataSource";
import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "./interfaces/padrao.interfaces";
import { Like } from "typeorm";

export default class ClsCategoriaController {
  public consultar({
    entidade,
    criterio,
    camposLike,
    select,
    relations = []
  }: PadraoCrudInterface): Promise<RespostaPadraoInterface<any>> {
    let where: Record<string, any> = {};

    where = { ...criterio };

    camposLike.forEach((campo) => {
      where[campo] = Like(where[campo]);
    });

    AppDataSource.getRepository(entidade);

    // console.log('relations',relations)

    return AppDataSource.getRepository(entidade)
      .find({ where: where, select: select, relations: relations })
      .then((rs) => {
        return {
          ok: true,
          mensagem: "Pesquisa Concluída",
          dados: rs,
        };
      });
  }

  public excluir(
    entidade: string,
    criterio: Record<string, any>
  ): Promise<RespostaPadraoInterface<any>> {
    return AppDataSource.getRepository(entidade)
      .delete(criterio)
      .then((rs) => {
        if (rs.affected > 0) {
          return {
            ok: true,
            mensagem: "Exclusão Realizada",
          };
        } else {
          return {
            ok: false,
            mensagem: "Registro Não Encontrado",
          };
        }
      })
      .catch((e) => {
        return {
          ok: false,
          mensagem: e.message,
        };
      });
  }

  /**
   *
   * @param dados
   * @param entidade
   * @returns
   */
  public incluir(
    criterio: Record<string, any>,
    entidade: string
  ): Promise<RespostaPadraoInterface<any>> {
    return AppDataSource.getRepository(entidade)
      .save(criterio)
      .then((rs) => {
        return {
          ok: true,
          mensagem: "Incluído Com Sucesso",
          dados: rs,
        };
      })
      .catch((e) => {
        return Promise.resolve({
          ok: false,
          mensagem: e.message,
        });
      });
  }
}
