import React, { useState } from "react"

export interface UsuarioStateInterface {
  logado: boolean
  nome: string
}

export function useUsuarioState() {
  const [usuarioState, setUsuarioState] = useState<UsuarioStateInterface>({
    logado: false,
    nome: "Fleek",
  })

  return { usuarioState, setUsuarioState }
}
