import axios, { AxiosRequestConfig } from "axios"
import { MensagemStateInterface } from "../globalstate/MensagemState"
import { URL_BACKEND } from "../config/servidor"

interface PropsInterface {
    metodo: 'get' | 'post' | 'put' | 'delete'
    url: string,
    dados?: Record<any, any>
    mensagem?: string
    setMensagemState?: React.Dispatch<
        React.SetStateAction<MensagemStateInterface>
    >
}

export default class ClsBackEnd {
    public execute<T>({
        metodo,
        url,
        setMensagemState = undefined,
        mensagem = "",
        dados = {}
    }: PropsInterface): Promise<T> {

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

        return axios[metodo]<T>(
            URL_BACKEND.concat('/', url),
            dados,
            config
        )
            .then((rs) => {
                return rs.data
                /*
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
              */
            })
    }
}