import React from "react"

import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { IconButton } from "@mui/material"

export interface CabecalhoListCrudInterface {
  titulo: string
  nomeCampo: string
  alinhamento: string
}

interface PropsInterface {
  cabecalho: Array<CabecalhoListCrudInterface>
  registros: Array<any>
  campoId: string
  onEditar: (id: string | number) => void
  onExcluir: (id: string | number) => void
}

export default function ListCrud({
  cabecalho,
  registros,
  campoId,
  onEditar,
  onExcluir,
}: PropsInterface) {
  const btEditar = (id: string | number) => {
    onEditar(id.toString())
  }

  const btExcluir = (id: string | number) => {
    onExcluir(id.toString())
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {cabecalho.map((cab, indice) => (
                <TableCell key={indice}>{cab.titulo}</TableCell>
              ))}
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((reg, indice) => (
              <TableRow key={indice}>
                {cabecalho.map((cab, indice) => (
                  <TableCell key={indice}>{reg[cab.nomeCampo]}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    color="primary"
                    size="large"
                    sx={{ ml: 2 }}
                    onClick={() => btExcluir(reg[campoId])}
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    size="large"
                    sx={{ ml: 2 }}
                    onClick={() => btEditar(reg[campoId])}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
