import { AppDataSource } from "../dataSource";
import Atleta from "../entity/Atleta";

export default class ClsAtleta {
  public incluir(atleta: Atleta) {
    AppDataSource.getRepository(Atleta).save(atleta)
  }
}
