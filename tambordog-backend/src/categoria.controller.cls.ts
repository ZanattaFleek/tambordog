import { AppDataSource } from "./dataSource";
import Categoria from "./entity/Categoria";
import { CategoriaInterface } from "./interfaces/categoria.interfaces";

export default class ClsCategoriaController {
  public incluirCategoria(dados: CategoriaInterface) {
    return AppDataSource.getRepository(Categoria)
      .save(dados)
      .then((rsCategoria) => {
        return {
          ok: true,
          mensagem: "Cadastro Realizado Com Sucesso",
          dados: rsCategoria,
        };
      })
      .catch((e) => {
        return {
          ok: false,
          mensagem: e.message,
        };
      });
  }

  public incluir(dados: Record<string, any>, entidade: string) {
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
  }
}
