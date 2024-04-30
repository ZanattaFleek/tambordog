import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "../../../tambordog-backend/src/interfaces/padrao.interfaces"
import axios, { AxiosRequestConfig } from "axios"

export default class ClsCrud {
  public consultar({
    entidade,
    criterio,
    camposLike,
    select,
  }: PadraoCrudInterface): Promise<Array<any>> {
    const dados: PadraoCrudInterface = {
      entidade: entidade,
      criterio: criterio,
      camposLike: camposLike,
      select: select,
    }

    const config: AxiosRequestConfig = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
    }

    return axios
      .post<RespostaPadraoInterface<Array<any>>>(
        "http://localhost:4000/consultar",
        dados,
        config
      )
      .then((rs) => {
        return rs.data.dados as any
      })
  }

  public incluir({
    entidade,
    criterio,
  }: PadraoCrudInterface): Promise<RespostaPadraoInterface<any>> {
    const dados: PadraoCrudInterface = {
      entidade: entidade,
      criterio: criterio,
    }

    const config: AxiosRequestConfig = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
    }

    return axios
      .post<RespostaPadraoInterface<Array<any>>>(
        "http://localhost:4000/incluir",
        dados,
        config
      )
      .then((rs) => {
        return rs.data
      })
  }

  public excluir({
    entidade,
    criterio,
  }: PadraoCrudInterface): Promise<RespostaPadraoInterface<any>> {
    const dados: PadraoCrudInterface = {
      entidade: entidade,
      criterio: criterio,
    }

    const config: AxiosRequestConfig = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: dados,
    }

    return axios
      .delete<RespostaPadraoInterface<Array<any>>>(
        "http://localhost:4000/excluir",
        config
      )
      .then((rs) => {
        return rs.data
      })
  }
}
