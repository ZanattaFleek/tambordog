import React, { useContext } from "react"
import { styled } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import LogoutIcon from "@mui/icons-material/Logout"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { useNavigate } from "react-router-dom"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../../globalstate/ContextoGlobal"

export default function TopBar() {
  const { layoutState, setLayoutState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  /*
  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
    
  ) as ContextoGlobalInterface
  */
  const { usuarioState, setUsuarioState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface
  const navegar = useNavigate()

  /*
  const fecharLoading = () => {
    setMensagemState({ ...mensagemState, exibir: false })
  }

  const handleClick = (tipo: boolean) => {
    if (tipo) {
      navegar(layoutState.pathTituloAnterior)
      let _titulo: string = layoutState.titulo
      let _pathTitulo: string = layoutState.pathTitulo
      setLayoutState({
        titulo: layoutState.tituloAnterior,
        pathTitulo: layoutState.pathTituloAnterior,
        tituloAnterior: _titulo,
        pathTituloAnterior: _pathTitulo,
      })
    } else {
      setUsuarioState({ ...usuarioState, logado: false })
      navegar("/")
    }
  }
  */
  return (
    <>
      {/* onLoad={fecharLoading} */}

      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            size="small"
            // onClick={() => handleClick(true)}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Typography variant="h6" gutterBottom>
              {layoutState.titulo}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginRight: -2 }}>
            <IconButton
              edge="end"
              color="inherit"
              size="small"
              sx={{ mr: 1 }}
              // onClick={() => handleClick(false)}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
