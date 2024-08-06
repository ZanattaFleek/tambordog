import React, { useContext, useEffect, useState } from "react"
import { ProvaCategoriaInterface, ProvaInterface } from "../../../tambordog-backend/src/interfaces/prova.interfaces"
import DataTable, { DataTableCabecalhoInterface } from "../components/DataTable"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Paper,
  Tooltip,
} from "@mui/material"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"

import { StatusForm } from "../utils/ClsStatusForm"
import ClsCrud from "../utils/ClsCrud"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../globalstate/ContextoGlobal"
import { CategoriaInterface } from "../../../tambordog-backend/src/interfaces/categoria.interfaces"
import ComboBox from "../components/ComboBox"
import InputText from "../components/InputFormat"
import ClsValidacao from "../utils/ClsValidacao"

interface PropsInterface {
  rsDados: ProvaInterface
  setRsDados: React.Dispatch<React.SetStateAction<ProvaInterface>>
}

export default function CrudProvaCategoriaDetalhe({ rsDados, setRsDados }: PropsInterface) {

  const ResetDados: ProvaCategoriaInterface = {
    idCategoria: "",
    idProva: "",
    qtdPistas: 1,
  }

  const [open, setOpen] = useState<boolean>(false)

  const [dados, setDados] = useState<ProvaCategoriaInterface>(ResetDados)

  const [rsCategorias, setRsCategorias] = useState<Array<CategoriaInterface>>(
    []
  )

  const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.PESQUISAR)

  const clsCrud = new ClsCrud()

  const cabecalho: Array<DataTableCabecalhoInterface> = [
    {
      cabecalho: "Categoria",
      alinhamento: "left",
      campo: "idCategoria",
      format: (_v, rs: any) => rs.Categoria.nome
    },
    {
      cabecalho: "Pistas",
      alinhamento: "left",
      campo: "qtdPistas",
    },
  ]

  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const btIncluirCategoria = () => {
    setOpen(true)
    console.log("btIncluirCategoria")
  }

  const pesquisarCategorias = () => {
    clsCrud
      .consultar({
        entidade: "Categoria",
        criterio: {},
        select: ["idCategoria", "nome"],
        status: statusForm,
        mensagem: "Pesquisando provas...",
        setMensagemState: setMensagemState,
      })
      .then((rs: Array<CategoriaInterface>) => {
        setRsCategorias(rs)
      })
  }

  useEffect(() => {
    pesquisarCategorias()
  }, [])

  const [erros, setErros] = useState({})

  const validarDados = (): boolean => {
    const clsValidacao = new ClsValidacao()
    let retorno: boolean = true
    let tmpErros = {}

    retorno = clsValidacao.naoVazio(
      "idCategoria",
      dados,
      tmpErros,
      retorno,
      "Categoria Não Pode Ser Vazio"
    )

    retorno = clsValidacao.naoVazio(
      "qtdPistas",
      dados,
      tmpErros,
      retorno,
      "Informe a Qtd de Pistas"
    )

    setErros(tmpErros)

    return retorno
  }

  const podeIncluirCategoria = (): boolean => {

    const indice = rsDados.provaCategorias.findIndex(
      (v) => v.idCategoria === dados.idCategoria
    )

    if (indice >= 0) {
      setMensagemState({
        botaoFechar: true,
        exibir: true,
        mensagem: "Categoria Já Existente",
        tipo: "aviso",
        titulo: "Atenção!",
      })
    }

    return indice < 0
  }

  const btConfirmarInclusao = () => {
    if (validarDados() && podeIncluirCategoria()) {

      setRsDados({
        ...rsDados, provaCategorias:
          [
            ...rsDados.provaCategorias,
            {
              idCategoria: dados.idCategoria,
              idProva: dados.idProva,
              qtdPistas: dados.qtdPistas,
            }
          ]
      })

      setOpen(false)
    }
  }

  const btFechar = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => btFechar()}
      >
        <Paper
          sx={{
            display: "flex",
            margin: "10px",
            padding: "10px",
          }}
          variant="outlined"
        >
          <Grid
            container
            minHeight="50vh"
            minWidth="50vh"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <ComboBox
                opcoes={rsCategorias}
                campoDescricao="nome"
                campoID="idCategoria"
                dados={dados}
                mensagemPadraoCampoEmBranco="Escolha uma Categoria"
                field="idCategoria"
                label="Categoria"
                erros={erros}
                setState={setDados}
              />
            </Grid>

            <Grid item xs={12}>
              <InputText
                dados={dados}
                field="qtdPistas"
                label="Pistas"
                tipo="number"
                mask="000"
                erros={erros}
                setState={setDados}
              />
            </Grid>

            <Grid item xs={12}>
              <Tooltip
                title={"Confirmar ".concat(
                  statusForm === StatusForm.INCLUIR ? "inclusão" : "alteração"
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
            </Grid>
          </Grid>
        </Paper>
      </Dialog>

      <Grid container justifyContent="center" sx={{ mt: -3 }}>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Tooltip title="Incluir Categoria">
            <IconButton
              color="secondary"
              sx={{ mt: 5, ml: { xs: 0, md: 2 } }}
              onClick={() => btIncluirCategoria()}
            >
              <AddCircleIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <DataTable
            cabecalho={cabecalho}
            dados={rsDados.provaCategorias}
          /*
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
            */
          />
        </Grid>
      </Grid>
    </>
  )
}
