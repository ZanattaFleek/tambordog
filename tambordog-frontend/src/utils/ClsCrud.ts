import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "../../../tambordog-backend/src/interfaces/padrao.interfaces"
import axios, { AxiosRequestConfig } from "axios"
import { MensagemStateInterface } from "../globalstate/MensagemState"
import { StatusForm } from "./ClsStatusForm"
import { URL_BACKEND } from "../config/servidor"

export interface PropsInterface extends PadraoCrudInterface {
  status: StatusForm
  mensagem?: string
  setMensagemState?: React.Dispatch<
    React.SetStateAction<MensagemStateInterface>
  >
}

// console.log(URL_BACKEND)

export default class ClsCrud {
  public consultar({
    entidade,
    criterio,
    camposLike,
    select,
    setMensagemState,
    mensagem = "Pesquisando...",
    relations
  }: PropsInterface): Promise<Array<any>> {

    // console.clear()
    // console.log('relations:', relations)
    // console.log('entidade:', entidade)

    const dados: PadraoCrudInterface = {
      entidade: entidade,
      criterio: criterio,
      camposLike: camposLike,
      select: select,
      relations: relations
    }

    // console.log('dados:', dados)

    localStorage.setItem('Frank','BlaBalBla')

    const config: AxiosRequestConfig = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Authorization": "Bearer TesteDeTokenFrankPedro",
      },
    }

    if (setMensagemState) {
      setMensagemState({
        botaoFechar: false,
        exibir: true,
        mensagem: mensagem,
        tipo: "aviso",
        titulo: "",
      })
    }

    console.log(URL_BACKEND.concat("/consultar"), JSON.stringify(dados), JSON.stringify(config))

    return axios
      .post<RespostaPadraoInterface<Array<any>>>(
        URL_BACKEND.concat("/consultar"),
        dados,
        config
      )
      .then((rs) => {
        if (rs.data.ok && setMensagemState) {
          setMensagemState({
            botaoFechar: false,
            exibir: false,
            mensagem: "",
            tipo: "aviso",
            titulo: "",
          })
        } else if (!rs.data.ok && setMensagemState) {
          setMensagemState({
            botaoFechar: true,
            exibir: true,
            mensagem: "Erro ao pesquisar!",
            tipo: "erro",
            titulo: "Erro...",
          })
        }

        return rs.data.dados as any
      })
  }

  public incluir({
    entidade,
    criterio,
    setMensagemState,
    status,
  }: PropsInterface): Promise<RespostaPadraoInterface<any>> {
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

    if (setMensagemState) {
      setMensagemState({
        botaoFechar: false,
        exibir: true,
        mensagem:
          status === StatusForm.INCLUIR ? "Incluindo..." : "Alterando...",
        tipo: "aviso",
        titulo: "",
      })
    }

    return axios
      .post<RespostaPadraoInterface<Array<any>>>(
        URL_BACKEND.concat("/incluir"),
        dados,
        config
      )
      .then((rs) => {
        if (rs.data.ok && setMensagemState) {
          setMensagemState({
            botaoFechar: true,
            exibir: true,
            mensagem:
              status === StatusForm.INCLUIR
                ? "Inclusão realizada!"
                : "Alteração realizada!",
            tipo: "aviso",
            titulo: "",
          })
        } else if (!rs.data.ok && setMensagemState) {
          // console.log(rs.data.mensagem)
          setMensagemState({
            botaoFechar: true,
            exibir: true,
            mensagem:
              status === StatusForm.INCLUIR
                ? "Erro ao incluir!"
                : "Erro ao alterar!",
            tipo: "erro",
            titulo: "Erro...",
          })
        }
        return rs.data
      })
  }

  public excluir({
    entidade,
    criterio,
    setMensagemState,
  }: PropsInterface): Promise<RespostaPadraoInterface<any>> {
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

    if (setMensagemState) {
      setMensagemState({
        botaoFechar: false,
        exibir: true,
        mensagem: "Excluindo...",
        tipo: "aviso",
        titulo: "",
      })
    }

    return axios
      .delete<RespostaPadraoInterface<Array<any>>>(
        URL_BACKEND.concat("/excluir"),
        config
      )
      .then((rs) => {
        if (rs.data.ok && setMensagemState) {
          setMensagemState({
            botaoFechar: true,
            exibir: true,
            mensagem: "Exclusão realizada!",
            tipo: "aviso",
            titulo: "",
          })
        } else if (!rs.data.ok && setMensagemState) {
          setMensagemState({
            botaoFechar: true,
            exibir: true,
            mensagem: "Erro na exclusão!",
            tipo: "erro",
            titulo: "Erro...",
          })
        }

        return rs.data
      })
  }
}
