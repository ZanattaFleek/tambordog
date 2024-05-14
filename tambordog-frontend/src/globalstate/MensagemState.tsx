import React, { useState } from "react"

export interface MensagemStateInterface {
  tipo: "erro" | "aviso" | "advertencia"
  mensagem: string
  titulo: string
  botaoFechar: boolean
  exibir: boolean
}

export function useMensagemState() {
  const [mensagemState, setMensagemState] = useState<MensagemStateInterface>({
    botaoFechar: false,
    mensagem: "",
    tipo: "aviso",
    titulo: "",
    exibir: false,
  })

  return { mensagemState, setMensagemState }
}

/*

import React, { useState } from "react"

export interface UsuarioStateInterface {
  logado: boolean
  nome: string
}

export function useUsuarioState() {
  const [usuarioState, setUsuarioState] = useState<UsuarioStateInterface>({
    logado: true,
    nome: "Fleek",
  })

  return { usuarioState, setUsuarioState }
}
*/
