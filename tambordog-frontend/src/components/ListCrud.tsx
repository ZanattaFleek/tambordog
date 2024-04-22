import React from "react"
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export interface CabecalhoListCrudInterface {
  titulo: string
  nomeCampo: string
  alinhamento: string
}

interface PropsInterface {
  cabecalho: Array<CabecalhoListCrudInterface>
  registros: Array<any>
  campoId: string
}

export default function ListCrud({
  cabecalho,
  registros,
  campoId,
}: PropsInterface) {
  const btEditar = (id: string | number) => {
    alert("Editar ".concat(id.toString()))
  }

  const btExcluir = (id: string | number) => {
    alert("Excluir ".concat(id.toString()))
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
                  <Button onClick={() => btEditar(reg[campoId])}>Editar</Button>
                  <Button onClick={() => btExcluir(reg[campoId])}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
