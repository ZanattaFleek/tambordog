import React, { createContext } from "react"
import { UsuarioStateInterface } from "./UsuarioState"
import { LayoutStateInterface } from "./LayoutState"
import { MensagemStateInterface } from "./MensagemState"

export interface ContextoGlobalInterface {
  mensagemState: MensagemStateInterface
  setMensagemState: React.Dispatch<React.SetStateAction<MensagemStateInterface>>
  usuarioState: UsuarioStateInterface
  setUsuarioState: React.Dispatch<React.SetStateAction<UsuarioStateInterface>>
  layoutState: LayoutStateInterface
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutStateInterface>>
}

export const ContextoGlobal = createContext<ContextoGlobalInterface | null>(
  null
)
