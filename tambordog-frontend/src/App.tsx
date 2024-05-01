import React, { useEffect, useState } from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "./layout/Theme"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "./globalstate/ContextoGlobal"
import { useUsuarioState } from "./globalstate/UsuarioState"
import { useLayoutState } from "./globalstate/LayoutState"
import { Outlet } from "react-router-dom"
import Condicional from "./components/Condicional"
import MenuInferior from "./layout/MenuInferior"
import { ROTAS_LIVRES } from "./layout/ClsMenu"
import EventosEmAberto from "./eventos/EventosEmAberto"
import TopBar from "./layout/TopBar"

function App() {
  const chkRotaLivre = () => {
    const urlAtual: string = window.location.href

    const indice: number = ROTAS_LIVRES.findIndex((rsRota) => {
      return urlAtual.includes(rsRota)
    })

    setRotaLivre(indice >= 0)
  }

  const { usuarioState, setUsuarioState } = useUsuarioState()

  const { layoutState, setLayoutState } = useLayoutState()

  const [rotaLivre, setRotaLivre] = useState<boolean>(false)

  const ContextoGlobalDefault: ContextoGlobalInterface = {
    setUsuarioState: setUsuarioState,
    usuarioState: usuarioState,
    layoutState: layoutState,
    setLayoutState: setLayoutState,
  }

  useEffect(() => {
    chkRotaLivre()
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContextoGlobal.Provider value={ContextoGlobalDefault}>
          <Condicional condicao={usuarioState.logado}>
            <TopBar />
            <Outlet />
            <MenuInferior />
          </Condicional>

          <Condicional condicao={!usuarioState.logado && rotaLivre}>
            <Outlet />
          </Condicional>

          <Condicional condicao={!usuarioState.logado && !rotaLivre}>
            <EventosEmAberto />
          </Condicional>
        </ContextoGlobal.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
