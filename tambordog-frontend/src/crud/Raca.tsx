import React, { useState } from "react"

import { RacaInterface } from "../../../tambordog-backend/src/interfaces/raca.interfaces"

import { Button, Grid, Paper } from "@mui/material"
import InputFormat from "../components/InputFormat"
import ListCrud, { CabecalhoListCrudInterface } from "../components/ListCrud"
import ClsCrud from "../utils/ClsCrud"

export default function RacaCrud() {
  const [erros, setErros] = useState({})

  const clsCrud = new ClsCrud()

  const [pesquisa, setPesquisa] = useState({
    descricao: "",
  })

  const cabecalhoListCrud: Array<CabecalhoListCrudInterface> = [
    {
      titulo: "id",
      alinhamento: "left",
      nomeCampo: "idRaca",
    },
    {
      titulo: "Nome",
      alinhamento: "left",
      nomeCampo: "nome",
    },
  ]

  const registrosListCrud: Array<RacaInterface> = [
    {
      idRaca: "01",
      nome: "Border",
    },
    { idRaca: "02", nome: "Samoyeda" },
    { idRaca: "03", nome: "Pastor" },
    { idRaca: "04", nome: "NI" },
    { idRaca: "05", nome: "Golden" },
  ]

  const btPesquisar = () => {
    clsCrud
      .consultar({
        entidade: "Raca",
        criterio: {
          nome: "%".concat(pesquisa.descricao).concat("%"),
        },
        camposLike: ["nome"],
      })
      .then((rsRacas) => {
        console.log(rsRacas)
      })
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ padding: 3, margin: 3 }}>
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: "center", mb: 3, mt: 3 }}>
                Cadastro de Raças
              </Grid>

              <Grid item xs={12} sm={8} md={10}>
                <InputFormat
                  label="Pesquisa"
                  setDados={setPesquisa}
                  dados={pesquisa}
                  campo="descricao"
                  erros={erros}
                />
              </Grid>

              <Grid item xs={6} sm={2} md={1} sx={{ textAlign: "right" }}>
                <Button onClick={() => btPesquisar()}>Pesquisar</Button>
              </Grid>

              <Grid item xs={6} sm={2} md={1} sx={{ textAlign: "right" }}>
                <Button>Incluir</Button>
              </Grid>

              <Grid xs={12}>
                <ListCrud
                  cabecalho={cabecalhoListCrud}
                  registros={registrosListCrud}
                  campoId="idRaca"
                />
              </Grid>

              {/*
              <Grid item xs={12}>
              {JSON.stringify(pesquisa)}
              </Grid>
  */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
