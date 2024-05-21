import React, { useContext, useEffect, useState } from "react"

import { AtletaInterface } from "../../../tambordog-backend/src/interfaces/atleta.interfaces"

import { Grid, IconButton, Paper, Tooltip } from "@mui/material"
import InputFormat from "../components/InputFormat"
import ClsCrud from "../utils/ClsCrud"
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
import CrudCao from "./CrudCao"

enum StatusForm {
  INCLUIR = "INCLUIR",
  ALTERAR = "ALTERAR",
  PESQUISAR = "PESQUISAR",
  EXCLUIR = "EXCLUIR",
  CAES = "CAES",
}

export default function CrudAtleta() {
  const [erros, setErros] = useState({})

  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.PESQUISAR)

  const clsCrud = new ClsCrud()

  const [pesquisa, setPesquisa] = useState({
    descricao: "",
  })

  const resetDados: AtletaInterface = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    whatsapp: "",
    email: "",
    senha: "",
    ativo: false,
  }

  const [rsPesquisa, setRsPesquisa] = useState<Array<AtletaInterface>>([])

  const [rsDados, setRsDados] = useState<AtletaInterface>(resetDados)

  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const cabecalhoListCrud: Array<DataTableCabecalhoInterface> = [
    {
      cabecalho: "Nome",
      alinhamento: "left",
      campo: "nome",
    },
    {
      cabecalho: "CPF",
      alinhamento: "left",
      campo: "cpf",
    },
    {
      cabecalho: "Fone",
      alinhamento: "left",
      campo: "telefone",
    },
    {
      cabecalho: "WhatsAPP",
      alinhamento: "left",
      campo: "whatsapp",
    },
    {
      cabecalho: "Ativo",
      alinhamento: "left",
      campo: "ativo",
      format: (v: boolean) => (v ? "Sim" : "Não"),
    },
  ]

  const btPesquisar = () => {
    clsCrud
      .consultar({
        entidade: "Atleta",
        criterio: {
          nome: "%".concat(pesquisa.descricao).concat("%"),
        },
        camposLike: ["nome"],
        select: ["idAtleta", "nome", "cpf", "telefone", "whatsapp", "ativo"],
        status: statusForm as any,
        mensagem: 'Pesquisando atletas...',
        setMensagemState: setMensagemState
      })
      .then((rs: Array<AtletaInterface>) => {
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
      "nome",
      rsDados,
      tmpErros,
      retorno,
      "Nome não pode ser vazio"
    )

    retorno = clsValidacao.eCPF("cpf", rsDados, tmpErros, retorno, false)
    retorno = clsValidacao.eData(
      "dataNascimento",
      rsDados,
      tmpErros,
      retorno,
      false
    )
    retorno = clsValidacao.eTelefone(
      "telefone",
      rsDados,
      tmpErros,
      retorno,
      false
    )
    retorno = clsValidacao.eTelefone(
      "whatsapp",
      rsDados,
      tmpErros,
      retorno,
      false
    )
    retorno = clsValidacao.eEmail("email", rsDados, tmpErros, retorno, false)
    retorno = clsValidacao.naoVazio(
      "senha",
      rsDados,
      tmpErros,
      retorno,
      "Campo senha deve ser preenchido"
    )

    setErros(tmpErros)

    return retorno
  }

  const btConfirmarInclusao = () => {
    if (validarDados()) {
      clsCrud
        .incluir({
          entidade: "Atleta",
          criterio: rsDados,
          status: statusForm as any,
          setMensagemState: setMensagemState
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
        entidade: "Atleta",
        criterio: rsDados,
        status: statusForm as any,
        setMensagemState: setMensagemState
      })
      .then((rs) => {
        if (rs.ok) {
          btPesquisar()
          setStatusForm(StatusForm.PESQUISAR)
        }
      })
  }

  const pesquisaPorId = (id: string | number): Promise<AtletaInterface> => {
    return clsCrud
      .consultar({
        entidade: "Atleta",
        criterio: {
          idAtleta: id,
        },
        status: statusForm as any,
        mensagem: 'Pesquisando atleta',
        setMensagemState: setMensagemState
      })
      .then((rs: Array<AtletaInterface>) => {
        return rs[0]
      })
  }

  const onEditar = (id: string | number) => {
    pesquisaPorId(id).then((rs) => {
      setRsDados(rs)
      setStatusForm(StatusForm.ALTERAR)
    })
  }

  const onExcluir = (id: string | number) => {
    pesquisaPorId(id).then((rs) => {
      setRsDados(rs)
      setStatusForm(StatusForm.EXCLUIR)
    })
  }

  const onCaes = (id: string | number) => {
    pesquisaPorId(id).then((rs) => {
      setRsDados(rs)
      setStatusForm(StatusForm.CAES)
    })
  }

  const { layoutState, setLayoutState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  useEffect(() => {
    setLayoutState({ ...layoutState, titulo: "Cadastro de Atletas" })
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
                  <Tooltip title="Novo Atleta">
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
                        onAcionador: (rs: AtletaInterface) =>
                          onEditar(rs.idAtleta as string),
                        toolTip: "Editar",
                      },
                      {
                        icone: "delete",
                        onAcionador: (rs: AtletaInterface) =>
                          onExcluir(rs.idAtleta as string),
                        toolTip: "Excluir",
                      },
                      {
                        icone: "pets",
                        onAcionador: (rs: AtletaInterface) =>
                          onCaes(rs.idAtleta as string),
                        toolTip: "Cães",
                      },
                    ]}
                  />
                </Grid>
              </Condicional>

              <Condicional
                condicao={[
                  StatusForm.ALTERAR,
                  StatusForm.INCLUIR,
                  StatusForm.EXCLUIR,
                ].includes(statusForm)}
              >
                <Grid item xs={12}>
                  <InputFormat
                    label="Nome"
                    setState={setRsDados}
                    dados={rsDados}
                    field="nome"
                    maxLength={50}
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="CPF"
                    mask="cpf"
                    setState={setRsDados}
                    dados={rsDados}
                    field="cpf"
                    type="tel"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Nascimento"
                    tipo="date"
                    setState={setRsDados}
                    dados={rsDados}
                    field="dataNascimento"
                    type="tel"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Telefone"
                    mask="tel"
                    setState={setRsDados}
                    dados={rsDados}
                    field="telefone"
                    type="tel"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Whats APP"
                    mask="tel"
                    setState={setRsDados}
                    dados={rsDados}
                    field="whatsapp"
                    type="tel"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="e-mail"
                    setState={setRsDados}
                    dados={rsDados}
                    field="email"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Senha"
                    setState={setRsDados}
                    dados={rsDados}
                    field="senha"
                    maxLength={25}
                    type="password"
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Ativo"
                    setState={setRsDados}
                    dados={rsDados}
                    field="ativo"
                    tipo="checkbox"
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

              <Condicional condicao={statusForm === StatusForm.CAES}>
                <Grid item xs={12}>
                  <CrudCao rsAtleta={rsDados} />
                </Grid>
              </Condicional>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
