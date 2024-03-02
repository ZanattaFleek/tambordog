import React, { createContext } from "react"
import { UsuarioStateInterface } from "./UsuarioState"
import { LayoutStateInterface } from "./LayoutState"

export interface ContextoGlobalInterface {
  usuarioState: UsuarioStateInterface
  setUsuarioState: React.Dispatch<React.SetStateAction<UsuarioStateInterface>>
  layoutState: LayoutStateInterface
  setLayoutState: React.Dispatch<React.SetStateAction<LayoutStateInterface>>
}

export const ContextoGlobal = createContext<ContextoGlobalInterface | null>(
  null
)
