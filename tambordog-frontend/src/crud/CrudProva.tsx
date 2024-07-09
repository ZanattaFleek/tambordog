import React, { useContext, useEffect, useState } from "react"

import { ProvaInterface } from "../../../tambordog-backend/src/interfaces/prova.interfaces"

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
import { PisoType, PisoTypes } from "../backendImports/types/PisoTypes"
import { StatusProvaType, StatusProvaTypes } from "../backendImports/types/ProvaTypes"
import ClsFormatacao from "../utils/ClsFormatacao"
import ComboBox from "../components/ComboBox"

export default function CrudProva() {
  const clsFormatacao: ClsFormatacao = new ClsFormatacao()

  const [erros, setErros] = useState({})

  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.PESQUISAR)

  const clsCrud = new ClsCrud()

  const [pesquisa, setPesquisa] = useState({
    descricao: "",
  })

  const [rsPesquisa, setRsPesquisa] = useState<Array<ProvaInterface>>([])

  const resetDados: ProvaInterface = {
    idCampeonato: null,
    nomeProva: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    lat: "",
    long: "",
    tipoPiso: PisoType.grama,
    dataHoraProva: "",
    valorProva: 0,
    valorProvaAte12: 0,
    telefone: "",
    whatsapp: "",
    email: "",
    status: StatusProvaType.inscAberta,
    termoAceite: "",
    foto: false,
  }

  const [rsDados, setRsDados] = useState<ProvaInterface>(resetDados)

  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const cabecalhoListCrud: Array<DataTableCabecalhoInterface> = [
    {
      cabecalho: "Nome",
      alinhamento: "left",
      campo: "nomeProva",
    },
  ]

  const btPesquisar = () => {
    clsCrud
      .consultar({
        entidade: "Prova",
        criterio: {
          nomeProva: "%".concat(pesquisa.descricao).concat("%"),
        },
        camposLike: ["nomeProva"],
        select: ["idProva", "nomeProva"],
        status: statusForm,
        mensagem: "Pesquisando provas...",
        setMensagemState: setMensagemState,
      })
      .then((rs: Array<ProvaInterface>) => {
        setRsPesquisa(rs)
      })
  }

  const btIncluir = () => {
    setRsDados(resetDados)
    setStatusForm(StatusForm.INCLUIR)
  }

  const btCancelar = () => {
    setErros({})
    setRsDados(resetDados)
    setStatusForm(StatusForm.PESQUISAR)
  }

  const validarDados = (): boolean => {
    const clsValidacao = new ClsValidacao()
    let retorno: boolean = true
    let tmpErros = {}

    retorno = clsValidacao.naoVazio(
      "nomeProva",
      rsDados,
      tmpErros,
      retorno,
      "Nome da prova não pode ser vazio"
    )

    setErros(tmpErros)

    return retorno
  }

  const btConfirmarInclusao = () => {
    if (validarDados()) {
      clsCrud
        .incluir({
          entidade: "Prova",
          criterio: rsDados,
          status: statusForm,
          setMensagemState: setMensagemState,
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
        entidade: "Prova",
        criterio: rsDados,
        status: statusForm,
        setMensagemState: setMensagemState,
      })
      .then((rs) => {
        if (rs.ok) {
          btPesquisar()
          setStatusForm(StatusForm.PESQUISAR)
        }
      })
  }

  const pesquisaPorId = (id: string | number): Promise<ProvaInterface> => {
    return clsCrud
      .consultar({
        entidade: "Prova",
        criterio: {
          idProva: id,
        },
        status: statusForm,
        mensagem: "Pesquisando prova",
        setMensagemState: setMensagemState,
      })
      .then((rs: Array<ProvaInterface>) => {
        return {
          ...rs[0],
          dataHoraProva: clsFormatacao.dataTimeZoneZtoLocalInput(
            rs[0].dataHoraProva
          ),
        }
      })
  }

  const onEditar = (id: string | number) => {
    pesquisaPorId(id).then((rs) => {
      console.log("Campos Que retornaram: ", rs)
      setRsDados(rs)
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
    setLayoutState({ ...layoutState, titulo: "Cadastro de Provas" })
  }, [])

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: { xs: 1, md: 3 }, margin: { xs: 1, md: 3 } }}>
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
                  <Tooltip title="Nova Prova">
                    <IconButton
                      color="secondary"
                      sx={{ mt: 5, ml: { xs: 0, md: 2 } }}
                      onClick={() => btIncluir()}
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
                        onAcionador: (rs: ProvaInterface) =>
                          onEditar(rs.idProva as string),
                        toolTip: "Editar",
                      },
                      {
                        icone: "delete",
                        onAcionador: (rs: ProvaInterface) =>
                          onExcluir(rs.idProva as string),
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
                    field="nomeProva"
                    maxLength={35}
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Data Hora Prova"
                    setState={setRsDados}
                    dados={rsDados}
                    field="dataHoraProva"
                    type="datetime-local"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12} md={9} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Endereço"
                    tipo="text"
                    dados={rsDados}
                    field="endereco"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={100}
                  />
                </Grid>

                <Grid item xs={9} md={3} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Bairro"
                    tipo="text"
                    dados={rsDados}
                    field="bairro"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={60}
                  />
                </Grid>

                <Grid item xs={12} md={5} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Cidade"
                    tipo="text"
                    dados={rsDados}
                    field="cidade"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={60}
                  />
                </Grid>

                <Grid item xs={12} md={2} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="UF"
                    tipo="text"
                    dados={rsDados}
                    field="uf"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={2}
                  />
                </Grid>

                <Grid item xs={12} md={3} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Valor da Prova"
                    dados={rsDados}
                    tipo="currency"
                    field="valorProva"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                  />
                </Grid>

                <Grid item xs={12} md={3} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Valor da Prova até 12(anos)"
                    tipo="currency"
                    type="currency"
                    dados={rsDados}
                    field="valorProvaAte12"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                  />
                </Grid>

                <Grid item xs={12} md={3} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Telefone"
                    setState={setRsDados}
                    dados={rsDados}
                    field="telefone"
                    erros={erros}
                    type="tel"
                    mask="tel"
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12} md={3} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="WhatsApp"
                    setState={setRsDados}
                    dados={rsDados}
                    field="whatsapp"
                    erros={erros}
                    type="tel"
                    mask="tel"
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="E-mail"
                    setState={setRsDados}
                    dados={rsDados}
                    field="email"
                    erros={erros}
                    type="email"
                    tipo="text"
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12} md={4} sx={{ mt: 2, pl: { md: 1 } }}>
                  <ComboBox
                    opcoes={PisoTypes}
                    campoDescricao="descricao"
                    campoID="idTipoPiso"
                    dados={rsDados}
                    mensagemPadraoCampoEmBranco="Escolha um piso"
                    field="tipoPiso"
                    label="Piso"
                    erros={erros}
                    setState={setRsDados}
                  />
                </Grid>

                <Grid item xs={12} md={4} sx={{ mt: 2, pl: { md: 1 } }}>
                  <ComboBox
                    opcoes={StatusProvaTypes}
                    campoDescricao="descricao"
                    campoID="idStatusProva"
                    dados={rsDados}
                    mensagemPadraoCampoEmBranco="Escolha um status"
                    field="status"
                    label="Status"
                    erros={erros}
                    setState={setRsDados}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Latitude"
                    tipo="text"
                    dados={rsDados}
                    field="lat"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={10}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 2, pl: { md: 1 } }}>
                  <InputFormat
                    label="Longitude"
                    tipo="text"
                    dados={rsDados}
                    field="long"
                    setState={setRsDados}
                    disabled={statusForm === StatusForm.EXCLUIR}
                    erros={erros}
                    maxLength={10}
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
      <p>{JSON.stringify(rsDados)}</p>
    </>
  )
}
