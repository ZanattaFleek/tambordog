import { AppDataSource } from "./dataSource";

export default class ClsCategoriaController {
  public excluir(entidade: string, criterio: Record<string, any>) {
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
  public incluir(dados: Record<string, any>, entidade: string) {
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
