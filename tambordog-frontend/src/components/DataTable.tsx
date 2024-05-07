import React, { useState } from "react"
import {
  tableCellClasses,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Tooltip,
} from "@mui/material"
import TablePagination from "@mui/material/TablePagination"
import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/styles"
import Icon from "@mui/material/Icon/Icon"
import Condicional from "./Condicional"

export interface DataTableCabecalhoInterface {
  campo: string
  cabecalho: string
  alinhamento?: "left" | "right" | "center"
  largura?: number
  format?: (arg: any, row: any) => string | number | undefined
}

export interface DataTableAcaoInterface<T> {
  toolTip: string
  onAcionador: (arg: T, index: number) => void
  icone: string
  corIcone?: string
  onDisabled?: (arg: T) => boolean
}

export interface DataTableInterface<T> {
  dados: Array<{ [key: string]: number | string }> | Array<Object>
  cabecalho: Array<DataTableCabecalhoInterface>
  acoes?: Array<DataTableAcaoInterface<T>>
  onSelecionarLinha?: (
    rs: { [key: string]: number | string } | Object,
    linha: number
  ) => void
  exibirPaginacao?: boolean
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /*
  [`&:nth-of-type(1)`]: {
    position: 'sticky',
    left: 0,
    backgroundColor: '#FFFF',
  },
  */
  [`&.${tableCellClasses.head}`]: {
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    fontSize: 15,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.head}:nth-of-type(1)`]: {
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    fontSize: 15,
    color: theme.palette.common.white,
    position: "sticky",
    left: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}:nth-of-type(1)`]: {
    fontSize: 14,
    position: "sticky",
    left: 0,
    backgroundColor: "#FFFF",
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

export default function DataTable<T>({
  dados = [],
  cabecalho = [],
  acoes = [],
  onSelecionarLinha = undefined,
  exibirPaginacao = true,
}: DataTableInterface<T>) {
  const theme = useTheme()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              {cabecalho.map((coluna, indice) => (
                <StyledTableCell
                  key={indice}
                  align={coluna.alinhamento ? coluna.alinhamento : "left"}
                  style={{ minWidth: coluna.largura }}
                >
                  {coluna.cabecalho}
                </StyledTableCell>
              ))}

              <Condicional condicao={acoes.length > 0}>
                <StyledTableCell align="right">Opções</StyledTableCell>
              </Condicional>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, indice) => {
                return (
                  <StyledTableRow
                    key={indice}
                    onClick={() =>
                      onSelecionarLinha
                        ? onSelecionarLinha(row, page * rowsPerPage + indice)
                        : ""
                    }
                  >
                    {cabecalho.map((coluna, indice) => {
                      return (
                        <StyledTableCell
                          key={indice}
                          align={
                            coluna.alinhamento ? coluna.alinhamento : "left"
                          }
                        >
                          {coluna.format
                            ? coluna.format((row as any)[coluna.campo], row)
                            : (row as any)[coluna.campo]}
                        </StyledTableCell>
                      )
                    })}

                    <Condicional condicao={acoes.length > 0}>
                      <StyledTableCell align="right">
                        {acoes.map((acao, index) => (
                          <Tooltip title={acao.toolTip} key={index}>
                            <span>
                              <IconButton
                                disabled={
                                  acao.onDisabled
                                    ? acao.onDisabled(row as T)
                                    : false
                                }
                                onClick={() =>
                                  acao.onAcionador(row as T, indice)
                                }
                                sx={{ mx: 0, px: 0 }}
                              >
                                <Icon
                                  sx={{
                                    color: acao.corIcone
                                      ? acao.corIcone
                                      : theme.palette.secondary.main,
                                  }}
                                >
                                  {acao.icone}
                                </Icon>
                              </IconButton>
                            </span>
                          </Tooltip>
                        ))}
                      </StyledTableCell>
                    </Condicional>
                  </StyledTableRow>
                )
              })}

            <Condicional condicao={dados.length === 0}>
              <StyledTableRow>
                <StyledTableCell
                  colSpan={cabecalho.length + 1}
                  style={{ textAlign: "center" }}
                >
                  <p>Não Há registros!!!!</p>
                </StyledTableCell>
              </StyledTableRow>
            </Condicional>
          </TableBody>
        </Table>
      </TableContainer>
      {/*
        labelDisplayedRows={() => {return 'caca'}}
      */}
      <Condicional condicao={exibirPaginacao}>
        <TablePagination
          labelRowsPerPage="Qtd: "
          rowsPerPageOptions={[
            10,
            25,
            { value: dados && dados.length ? dados.length : 0, label: "Todos" },
          ]}
          component="div"
          count={dados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Condicional>
    </>
  )
}
