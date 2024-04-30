import React, { useState } from "react"

import { RacaInterface } from "../../../tambordog-backend/src/interfaces/raca.interfaces"

import { Button, Grid, Paper } from "@mui/material"
import InputFormat from "../components/InputFormat"
import ListCrud, { CabecalhoListCrudInterface } from "../components/ListCrud"
import ClsCrud from "../utils/ClsCrud"
import { StatusForm } from "../utils/ClsStatusForm"
import Condicional from "../components/Condicional"
import ClsValidacao from "../utils/ClsValidacao"

export default function RacaCrud() {
  const [erros, setErros] = useState({})

  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.PESQUISAR)

  const clsCrud = new ClsCrud()

  const [pesquisa, setPesquisa] = useState({
    descricao: "",
  })

  const [rsPesquisa, setRsPesquisa] = useState<Array<RacaInterface>>([])

  const [rsDados, setRsDados] = useState<RacaInterface>({
    nome: "",
  })

  const cabecalhoListCrud: Array<CabecalhoListCrudInterface> = [
    {
      titulo: "Nome",
      alinhamento: "left",
      nomeCampo: "nome",
    },
  ]

  const btPesquisar = () => {
    clsCrud
      .consultar({
        entidade: "Raca",
        criterio: {
          nome: "%".concat(pesquisa.descricao).concat("%"),
        },
        camposLike: ["nome"],
        select: ["idRaca", "nome"],
      })
      .then((rsRacas: Array<RacaInterface>) => {
        setRsPesquisa(rsRacas)
      })
  }

  const btNovaRaca = () => {
    setStatusForm(StatusForm.INCLUIR)
  }

  const btCancelar = () => {
    setStatusForm(StatusForm.PESQUISAR)
  }

  const validarDados = (): boolean => {
    const clsValidacao = new ClsValidacao()
    let retorno: boolean = true
    let tmpErros = {}

    retorno = clsValidacao.naoVazio(
      "nome",
      rsDados,
      tmpErros,
      retorno,
      "Nome da raça não pode ser vazio"
    )

    setErros(tmpErros)

    return retorno
  }

  const btConfirmarInclusao = () => {
    if (validarDados()) {
      clsCrud
        .incluir({
          entidade: "Raca",
          criterio: rsDados,
        })
        .then((rs) => {
          if (rs.ok) {
            btPesquisar()
            setStatusForm(StatusForm.PESQUISAR)
          }
        })
    }
  }

  const btConfirmarExclusao = () => {
    clsCrud
      .excluir({
        entidade: "Raca",
        criterio: rsDados,
      })
      .then((rs) => {
        if (rs.ok) {
          btPesquisar()
          setStatusForm(StatusForm.PESQUISAR)
        }
      })
  }

  const pesquisaPorId = (id: string | number): Promise<RacaInterface> => {
    return clsCrud
      .consultar({
        entidade: "Raca",
        criterio: {
          idRaca: id,
        },
      })
      .then((rsRaca: Array<RacaInterface>) => {
        return rsRaca[0]
      })
  }

  const onEditar = (id: string | number) => {
    pesquisaPorId(id).then((rsRaca) => {
      setRsDados(rsRaca)
      setStatusForm(StatusForm.ALTERAR)
    })
  }

  const onExcluir = (id: string | number) => {
    pesquisaPorId(id).then((rsRaca) => {
      setRsDados(rsRaca)
      setStatusForm(StatusForm.EXCLUIR)
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

              <Condicional condicao={statusForm == StatusForm.PESQUISAR}>
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
                  <Button onClick={() => btNovaRaca()}>Nova Raça</Button>
                </Grid>

                <Grid item xs={12}>
                  <ListCrud
                    cabecalho={cabecalhoListCrud}
                    registros={rsPesquisa}
                    campoId="idRaca"
                    onEditar={onEditar}
                    onExcluir={onExcluir}
                  />
                </Grid>
              </Condicional>

              <Condicional condicao={statusForm !== StatusForm.PESQUISAR}>
                <Grid item xs={12} sm={8} md={10}>
                  <InputFormat
                    label="Nome"
                    setDados={setRsDados}
                    dados={rsDados}
                    campo="nome"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Condicional
                  condicao={[StatusForm.INCLUIR, StatusForm.ALTERAR].includes(
                    statusForm
                  )}
                >
                  <Grid item xs={6} sm={2} md={1} sx={{ textAlign: "right" }}>
                    <Button onClick={() => btConfirmarInclusao()}>
                      {statusForm == StatusForm.INCLUIR ? "Incluir" : "Alterar"}
                    </Button>
                  </Grid>
                </Condicional>

                <Condicional
                  condicao={[StatusForm.EXCLUIR].includes(statusForm)}
                >
                  <Grid item xs={6} sm={2} md={1} sx={{ textAlign: "right" }}>
                    <Button onClick={() => btConfirmarExclusao()}>
                      Excluir
                    </Button>
                  </Grid>
                </Condicional>

                <Grid item xs={6} sm={2} md={1} sx={{ textAlign: "right" }}>
                  <Button onClick={() => btCancelar()}>Cancelar</Button>
                </Grid>
              </Condicional>

              {/*

                <Grid item xs={12}>
                  {JSON.stringify(rsRegistros)}
                </Grid>
                */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
