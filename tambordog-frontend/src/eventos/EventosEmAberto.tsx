import React, { useContext } from "react"
import CardEvento from "./CardEvento"
import { Button, Chip, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../globalstate/ContextoGlobal"

export default function EventosEmAberto() {
  const handleClick = (oque: string) => {
    console.info("Ordenar os Eventos por ", oque)
  }

  const nav = useNavigate()

  const { layoutState, setLayoutState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const btClick = (url: string) => {
    nav(url)
    console.log(url)
    setLayoutState({ ...layoutState, titulo: "" })
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ marginLeft: 15 }}>
        <Chip label="Favoritos" onClick={() => handleClick("Favoritos")} />
        <Chip label="Circuitos" onClick={() => handleClick("Circuitos")} />
        <Chip label="Open" onClick={() => handleClick("Open")} />
      </Stack>
      <CardEvento
        titulo={"Circuito Etapa RJ"}
        imagem={"logo512.png"}
        cidade={"Volta Redonda"}
        uf={"RJ"}
        data={"02/10/2023"}
        qtdInscritos={4}
      />
      <CardEvento
        titulo={"Open Cia do Cão"}
        imagem={"logo512.png"}
        cidade={"Divinópolis"}
        uf={"MG"}
        data={"13/10/2023"}
        qtdInscritos={4}
      />
      <CardEvento
        titulo={"Circuito Etapa MG"}
        imagem={"logo512.png"}
        cidade={"Divinópolis"}
        uf={"MG"}
        data={"05/11/2023"}
        qtdInscritos={4}
      />

      <Button onClick={() => btClick("CadastroUsuario")}>Novo Usuário</Button>
      <Button onClick={() => btClick("Login")}>Login</Button>
    </>
  )
}
