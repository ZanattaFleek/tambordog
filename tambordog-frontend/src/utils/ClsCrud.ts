import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "../../../tambordog-backend/src/interfaces/padrao.interfaces"
import axios from "axios"

export default class ClsCrud {
  public consultar({
    entidade,
    criterio,
    camposLike,
  }: PadraoCrudInterface): Promise<Array<any>> {
    const dados: PadraoCrudInterface = {
      entidade: entidade,
      criterio: criterio,
      camposLike: camposLike,
    }

    const config = {
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

    /*
    let data: Record<string, any> = {
      entidade: entidade,
      criterio: { ...criterio },
    }

    if (typeof camposLike !== "undefined") {
      data.camposLike = [...camposLike]
    }

    const config = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    console.log(data)

    return axios
      .get("http://localhost:4000/consultar", config)
      .then((response) => {
        return response.data as Array<any>
      })
      .catch((error) => {
        console.log(error)
        return []
      })
      */
  }
}
