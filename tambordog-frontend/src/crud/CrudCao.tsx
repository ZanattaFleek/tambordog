import React, { useContext, useEffect, useState } from "react"

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
import { AtletaInterface } from "../../../tambordog-backend/src/interfaces/atleta.interfaces"
import ShowText from "../components/ShowText"
import { CaoInterface } from "../../../tambordog-backend/src/interfaces/cao.interfaces"
import { CategoriaInterface } from "../../../tambordog-backend/src/interfaces/categoria.interfaces"
import { RacaInterface } from "../../../tambordog-backend/src/interfaces/raca.interfaces"
import ComboBox from "../components/ComboBox"
import ClsFormatacao from "../utils/ClsFormatacao"

interface PropsInterface {
  rsAtleta: AtletaInterface
}

export default function CrudCao({ rsAtleta }: PropsInterface) {
  const [erros, setErros] = useState({})

  const clsFormatacao: ClsFormatacao = new ClsFormatacao()

  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.PESQUISAR)

  const clsCrud = new ClsCrud()

  const [rsCategorias, setRsCategorias] = useState<Array<CategoriaInterface>>(
    []
  )

  const [rsRacas, setRsRacas] = useState<Array<RacaInterface>>([])

  const [pesquisa, setPesquisa] = useState({
    descricao: "",
  })

  const [rsPesquisa, setRsPesquisa] = useState<Array<CaoInterface>>([])

  const resetDados: CaoInterface = {
    nome: "",
    dataNascimento: "",
    ativo: true,
    avatar: "",
    idAtleta: rsAtleta.idAtleta as string,
    idCategoria: "",
    idRaca: "",
  }

  const [rsDados, setRsDados] = useState<CaoInterface>(resetDados)

  const cabecalhoListCrud: Array<DataTableCabecalhoInterface> = [
    {
      cabecalho: "Nome",
      alinhamento: "left",
      campo: "nome",
    },
    {
      cabecalho: "Data Nascimento",
      campo: "dataNascimento",
      format: (data) => clsFormatacao.dataISOtoUser(data),
    },
    {
      cabecalho: "Ativo",
      campo: "ativo",
      format: (rs: boolean) => (rs ? "Sim" : "Não"),
    },
  ]

  const btPesquisar = () => {
    clsCrud
      .consultar({
        entidade: "Cao",
        criterio: {
          idAtleta: rsAtleta.idAtleta,
        },
        select: ["idCao", "nome", "dataNascimento", "ativo"],
        status: statusForm,
        mensagem: "Pesquisando cães...",
      })
      .then((rs: Array<CaoInterface>) => {
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
      "Nome do cão não pode ser vazio"
    )

    retorno = clsValidacao.naoVazio(
      "idCategoria",
      rsDados,
      tmpErros,
      retorno,
      "Informe uma categoria"
    )

    retorno = clsValidacao.naoVazio(
      "idRaca",
      rsDados,
      tmpErros,
      retorno,
      "Informe uma raça"
    )

    retorno = clsValidacao.eData("dataNascimento", rsDados, tmpErros, retorno)

    // TODO - Validar Dados....

    setErros(tmpErros)

    return retorno
  }

  const btConfirmarInclusao = () => {
    if (validarDados()) {
      clsCrud
        .incluir({
          entidade: "Cao",
          criterio: rsDados,
          status: statusForm,
          setMensagemState: setMensagemState,
        })
        .then((rs) => {
          if (rs.ok) {
            btPesquisar()
            setStatusForm(StatusForm.PESQUISAR)
          } else {
            setMensagemState({
              botaoFechar: true,
              mensagem: "Erro no Cadastro - Consulte Suporte",
              titulo: "Erro no Cadastro",
              tipo: "erro",
              exibir: true,
            })
          }
        })
    }
  }

  const btConfirmarExclusao = () => {
    clsCrud
      .excluir({
        entidade: "Cao",
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

  const pesquisaPorId = (id: string | number): Promise<CaoInterface> => {
    return clsCrud
      .consultar({
        entidade: "Cao",
        criterio: {
          idCao: id,
        },
        status: statusForm,
        mensagem: "Pesquisando cão",
        setMensagemState: setMensagemState,
      })
      .then((rs: Array<CaoInterface>) => {
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

  const { layoutState, setLayoutState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const pesquisarRacas = () => {
    clsCrud
      .consultar({
        entidade: "Raca",
        criterio: {},
        select: ["idRaca", "nome"],
        status: statusForm,
        setMensagemState: setMensagemState,
      })
      .then((rs: Array<RacaInterface>) => {
        setRsRacas(rs)
      })
  }

  const pesquisarCategorias = () => {
    clsCrud
      .consultar({
        entidade: "Categoria",
        criterio: {},
        select: ["idCategoria", "nome"],
        status: statusForm,
      })
      .then((rs: Array<CategoriaInterface>) => {
        setRsCategorias(rs)
      })
  }

  useEffect(() => {
    setLayoutState({ ...layoutState, titulo: "Cadastro de Cães" })
    pesquisarCategorias()
    pesquisarRacas()
    btPesquisar()
  }, [])

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ShowText titulo="Atleta" descricao={rsAtleta.nome} />
        </Grid>

        <Grid item xs={12}>
          <ShowText
            titulo="WhatsAPP"
            tipo="whatsapp"
            descricao={rsAtleta.whatsapp}
          />
        </Grid>

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
                  <Tooltip title="Novo Cão">
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
                        onAcionador: (rs: CaoInterface) =>
                          onEditar(rs.idCao as string),
                        toolTip: "Editar",
                      },
                      {
                        icone: "delete",
                        onAcionador: (rs: CaoInterface) =>
                          onExcluir(rs.idCao as string),
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
                    maxLength={35}
                    erros={erros}
                    disabled={statusForm === StatusForm.EXCLUIR}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputFormat
                    label="Data Nascimento"
                    setState={setRsDados}
                    dados={rsDados}
                    field="dataNascimento"
                    tipo="date"
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

                <Grid item xs={12}>
                  <ComboBox
                    opcoes={rsRacas}
                    campoDescricao="nome"
                    campoID="idRaca"
                    dados={rsDados}
                    mensagemPadraoCampoEmBranco="Escolha uma raça"
                    field="idRaca"
                    label="Raça"
                    erros={erros}
                    setState={setRsDados}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ComboBox
                    opcoes={rsCategorias}
                    campoDescricao="nome"
                    campoID="idCategoria"
                    dados={rsDados}
                    mensagemPadraoCampoEmBranco="Escolha uma categoria"
                    field="idCategoria"
                    label="Categoria"
                    erros={erros}
                    setState={setRsDados}
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
      {JSON.stringify(rsDados)}
      {JSON.stringify(erros)}
    </>
  )
}
