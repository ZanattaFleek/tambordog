import React, { forwardRef } from "react"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

import Condicional from "./Condicional"

interface PropsInputInterface {
  label: string
  campo: string
  setDados: React.Dispatch<React.SetStateAction<any>>
  dados: Record<string, string | number>
  erros: Record<string, string>
  opcoes: Array<Record<string | number, string | number>>
  nomeCampoChaveOpcoes: string
  nomeCampoDescricaoOpcoes: string
}

/**
 * Formata o Texto de Acordo com a Máscara Fornecida
 * @param label - Label do Texto - O que é exibido para o usuário
 * @param setDados - setState do Conjunto de Dados
 * @param dados - Dados Atuais a serem atualizados pelo setState
 * @param campo - Nome do campo a ser atualizado no setState
 * @param erros - Objeto de Erro que caso exista o campo, será exibido
 * @returns void
 */
export default function InputSelect({
  label,
  setDados,
  dados,
  campo,
  erros,
  opcoes,
  nomeCampoChaveOpcoes,
  nomeCampoDescricaoOpcoes,
}: PropsInputInterface) {
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          htmlFor={campo}
          sx={{ backgroundColor: "white", paddingX: 1 }}
        >
          {label}
        </InputLabel>

        <Select
          id={campo}
          value={dados[campo]}
          label={label}
          onChange={(evento) =>
            setDados({ ...dados, [campo]: evento.target.value })
          }
        >
          {opcoes.map((v, indice) => (
            <MenuItem key={indice} value={v[nomeCampoChaveOpcoes]}>
              {v[nomeCampoDescricaoOpcoes]}
            </MenuItem>
          ))}
        </Select>

        <Condicional condicao={typeof erros[campo] !== "undefined"}>
          <FormHelperText sx={{ color: "red" }}>{erros[campo]}</FormHelperText>
        </Condicional>
      </FormControl>
    </>
  )
}
