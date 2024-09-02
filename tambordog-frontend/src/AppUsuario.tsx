import React, { useEffect, useState } from "react"
import { AppBar, Box, Button, Container, Grid, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material"
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
import { THEME } from "./config/Theme"
import { styled } from "@mui/material/styles"
import { useMensagemState } from "./globalstate/MensagemState"
import Mensagem from "./components/Mensagem"
import { red } from "@mui/material/colors"
import CardEvento from "./eventos/CardEvento"

import { CardMedia } from '@mui/material';


export default function AppUsuario() {
  const chkRotaLivre = () => {
    const urlAtual: string = window.location.href

    const indice: number = ROTAS_LIVRES.findIndex((rsRota) => {
      return urlAtual.includes(rsRota)
    })

    setRotaLivre(indice >= 0)
  }

  const { usuarioState, setUsuarioState } = useUsuarioState()

  const { mensagemState, setMensagemState } = useMensagemState()

  const { layoutState, setLayoutState } = useLayoutState()

  const [rotaLivre, setRotaLivre] = useState<boolean>(false)

  const ContextoGlobalDefault: ContextoGlobalInterface = {
    setUsuarioState: setUsuarioState,
    usuarioState: usuarioState,
    layoutState: layoutState,
    setLayoutState: setLayoutState,
    mensagemState: mensagemState,
    setMensagemState: setMensagemState,
  }

  useEffect(() => {
    chkRotaLivre()
  })

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)

  return (
    <>

      <Box sx={{
        backgroundColor: '#F7BA0B',
        position: 'absolute',
        height: '418px',
        width: '100%',
        margin: 0,
        top: 0,
        left: 0,
        zIndex: -1
      }}>
      </Box>

      <AppBar position="static" sx={{ backgroundColor: '#3b4869' }}>

        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <img src="/imagens/logo.png" alt="Logo TamborDog" style={{ width: '70px' }} />

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button
                key='btCadastrar'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cadastrar
              </Button>

              <Button
                key='btEntrar'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Entrar
              </Button>
            </Box>

          </Toolbar>


        </Container>
      </AppBar>

      <Grid container justifyContent='center' alignItems='center'>

        <Grid item xs={12} sm={6}>

          <Typography
            component="p"
            sx={{
              mt: 5,
              textAlign: 'center',
              // display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontSize: { xs: '24pt', md: '36pt' },
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            BEM VINDO <br /> AO <br />TAMBORDOG
          </Typography>

          <CardMedia
            // src="https://www.youtube.com/embed/Ptbk2af68e8"
            src="./video/institucional.mp4"
            component="video"
            sx={{ width: '100%', marginTop: '15px', border: '1px solid black' }}

            autoPlay
            loop
            controls
          />

          <Typography
            component="p"
            sx={{
              mt: 5,
              textAlign: 'center',
              // display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontSize: { xs: '24pt', md: '36pt' },
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Próximas Provas
          </Typography>

          <CardEvento
            cidade="Divinópolis"
            data="20/10/2021"
            imagem="./imagens/logo.png"
            qtdInscritos={3}
            titulo="Circuito Tambor Dog"
            uf="MG"
          />
          <CardEvento
            cidade="Divinópolis"
            data="20/10/2021"
            imagem="./imagens/logo.png"
            qtdInscritos={3}
            titulo="Circuito Tambor Dog"
            uf="MG"
          />
          <CardEvento
            cidade="Divinópolis"
            data="20/10/2021"
            imagem="./imagens/logo.png"
            qtdInscritos={3}
            titulo="Circuito Tambor Dog"
            uf="MG"
          />
          <CardEvento
            cidade="Divinópolis"
            data="20/10/2021"
            imagem="./imagens/logo.png"
            qtdInscritos={3}
            titulo="Circuito Tambor Dog"
            uf="MG"
          />

        </Grid>

      </Grid>

    </>
  )
}
