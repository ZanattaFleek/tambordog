import { useContext } from "react"
import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "../../../tambordog-backend/src/interfaces/padrao.interfaces"
import axios, { AxiosRequestConfig } from "axios"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../globalstate/ContextoGlobal"
import { MensagemStateInterface } from "../globalstate/MensagemState"
import { StatusForm } from "./ClsStatusForm"

export interface PropsInterface extends PadraoCrudInterface {
  status: StatusForm
  mensagem?: string
  setMensagemState?: React.Dispatch<
    React.SetStateAction<MensagemStateInterface>
  >
}

export default class ClsCrud {
  public consultar({
    entidade,
    criterio,
    camposLike,
    select,
    setMensagemState,
    mensagem = "Pesquisando...",
  }: PropsInterface): Promise<Array<any>> {
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

    if (setMensagemState) {
      setMensagemState({
        botaoFechar: false,
        exibir: true,
        mensagem: mensagem,
        tipo: "aviso",
        titulo: "",
      })
    }

    return axios
      .post<RespostaPadraoInterface<Array<any>>>(
        "http://localhost:4000/consultar",
        dados,
        config
      )
      .then((rs) => {
        if (!rs.data.ok && setMensagemState) {
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
        "http://localhost:4000/incluir",
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
        "http://localhost:4000/excluir",
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
