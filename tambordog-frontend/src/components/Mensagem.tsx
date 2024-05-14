import React, { useContext } from "react"
import Condicional from "./Condicional"
import {
  ContextoGlobal,
  ContextoGlobalInterface,
} from "../globalstate/ContextoGlobal"
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

import CheckIcon from "@mui/icons-material/Check"

export default function Mensagem() {
  const { mensagemState, setMensagemState } = useContext(
    ContextoGlobal
  ) as ContextoGlobalInterface

  const btFechar = () => {
    setMensagemState({ ...mensagemState, exibir: false })
  }

  return (
    <>
      <Condicional condicao={mensagemState.exibir}>
        <Dialog
          open={mensagemState.exibir}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" color='primary'>
            {mensagemState.titulo}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color='secondary'>
              {mensagemState.mensagem}
            </DialogContentText>
          </DialogContent>
          <Condicional condicao={mensagemState.botaoFechar}>
            <DialogActions>
              <Button onClick={btFechar}>Fechar</Button>
            </DialogActions>
          </Condicional>
        </Dialog>
      </Condicional>
    </>
  )
}
