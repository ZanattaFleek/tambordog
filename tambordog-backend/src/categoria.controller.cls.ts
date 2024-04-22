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
  }: PadraoCrudInterface): Promise<RespostaPadraoInterface<any>> {
    let where: Record<string, any> = {};

    console.log("====================");
    console.log("Parametros do Consultar");
    console.log("====================");
    console.log("Criterio: ", criterio);
    console.log("entidade: ", entidade);
    console.log("camposLIke: ", camposLike);
    console.log("====================");

    // Recebo: { nome: '%Frank%' } --> Criterio
        // Correto
    // where = { nome: Like("%a%") }; 

    where = { ...criterio };

    camposLike.forEach((campo) => {
      where[campo] = Like(where[campo]); 
    }); 

    console.log("WHere: ", where);

    return AppDataSource.getRepository(entidade)
      .find({ where: where })
      .then((rs) => {
        console.log("Pesquisa COncluida: ", rs, where);
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
    dados: Record<string, any>,
    entidade: string
  ): Promise<RespostaPadraoInterface<any>> {
    return AppDataSource.getRepository(entidade)
      .save(dados)
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
    /*
    return AppDataSource.getRepository(entidade)
      .save(dados)
      .then((rs) => {
        return {
          ok: true,
          mensagem: "Cadastro Realizado Com Sucesso",
          dados: rs,
        };
      })
      .catch((e) => {
        return {
          ok: false,
          mensagem: e.message,
        };
      });
      */
  }
}
