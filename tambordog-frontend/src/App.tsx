import React from "react"
import Login from "./login/Login"
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

function App() {
  const { usuarioState, setUsuarioState } = useUsuarioState()
  const { layoutState, setLayoutState } = useLayoutState()

  const ContextoGlobalDefault: ContextoGlobalInterface = {
    setUsuarioState: setUsuarioState,
    usuarioState: usuarioState,
    layoutState: layoutState,
    setLayoutState: setLayoutState,
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContextoGlobal.Provider value={ContextoGlobalDefault}>
          <Condicional condicao={usuarioState.logado}>
            <Outlet />
            <MenuInferior />
          </Condicional>

          <Condicional condicao={!usuarioState.logado}>
            <Login />
          </Condicional>
        </ContextoGlobal.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
