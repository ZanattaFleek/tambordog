import React, { useContext, useEffect, useState } from "react"

import { RacaInterface } from "../../../tambordog-backend/src/interfaces/raca.interfaces"

import { Grid, IconButton, Paper, Tooltip } from "@mui/material"
import InputFormat from "../components/InputFormat"
import ClsCrud from "../utils/ClsCrud"
import { StatusForm } from "../utils/ClsStatusForm"
import Condicional from "../components/Condicional"
import ClsValidacao from "../utils/ClsValidacao"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"

import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../globalstate/ContextoGlobal"
import DataTable, { DataTableCabecalhoInterface } from "../components/DataTable"

export default function CrudRaca() {
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

  const cabecalhoListCrud: Array<DataTableCabecalhoInterface> = [
    {
      cabecalho: "Nome",
      alinhamento: "left",
      campo: "nome",
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

  const { layoutState, setLayoutState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  useEffect(() => {
    setLayoutState({ ...layoutState, titulo: "Cadatro de Raças" })
  }, [])

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 3, margin: 3 }}>
            <Grid container>
              <Condicional condicao={statusForm == StatusForm.PESQUISAR}>
                <Grid item xs={11}>
                  <InputFormat
                    label="Pesquisa"
                    setState={setPesquisa}
                    dados={pesquisa}
                    field="descricao"
                    erros={erros}
                    iconeEnd="search"
                    onClickIconeEnd={() => btPesquisar()}
                    mapKeyPress={[{ key: "Enter", onKey: btPesquisar }]}
                  />
                </Grid>

                <Grid item xs={1}>
                  <Tooltip title="Nova Raça">
                    <IconButton
                      color="secondary"
                      sx={{ mt: 5, ml: { xs: 0, md: 2 } }}
                      onClick={() => btNovaRaca()}
                    >
                      <AddCircleIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <DataTable
                    cabecalho={cabecalhoListCrud}
                    dados={rsPesquisa}
                    acoes={[
                      {
                        icone: "edit",
                        onAcionador: (rs: RacaInterface) =>
                          onEditar(rs.idRaca as string),
                        toolTip: "Editar",
                      },
                      {
                        icone: "delete",
                        onAcionador: (rs: RacaInterface) =>
                          onExcluir(rs.idRaca as string),
                        toolTip: "Excluir",
                      },
                    ]}
                  />
                </Grid>
              </Condicional>

              <Condicional condicao={statusForm !== StatusForm.PESQUISAR}>
                <Grid item xs={12}>
                  <InputFormat
                    label="Nome"
                    setState={setRsDados}
                    dados={rsDados}
                    field="nome"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3, textAlign: "right" }}>
                  <Tooltip title="Cancelar">
                    <IconButton
                      color="secondary"
                      size="large"
                      sx={{ ml: 2 }}
                      onClick={() => btCancelar()}
                    >
                      <CancelRoundedIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                  </Tooltip>

                  <Condicional
                    condicao={[StatusForm.INCLUIR, StatusForm.ALTERAR].includes(
                      statusForm
                    )}
                  >
                    <Tooltip
                      title={"Confirmar ".concat(
                        statusForm === StatusForm.INCLUIR
                          ? "inclusão"
                          : "alteração"
                      )}
                    >
                      <IconButton
                        color="secondary"
                        size="large"
                        sx={{ ml: 2 }}
                        onClick={() => btConfirmarInclusao()}
                      >
                        <CheckCircleRoundedIcon sx={{ fontSize: 35 }} />
                      </IconButton>
                    </Tooltip>
                  </Condicional>

                  <Condicional
                    condicao={[StatusForm.EXCLUIR].includes(statusForm)}
                  >
                    <Tooltip title="Confirmar exclusão">
                      <IconButton
                        color="secondary"
                        size="large"
                        sx={{ ml: 2 }}
                        onClick={() => btConfirmarExclusao()}
                      >
                        <DeleteForeverRoundedIcon sx={{ fontSize: 35 }} />
                      </IconButton>
                    </Tooltip>
                  </Condicional>
                </Grid>
              </Condicional>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
