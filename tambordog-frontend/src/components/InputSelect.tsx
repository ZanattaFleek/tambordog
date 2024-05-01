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
  field: string
  setState: React.Dispatch<React.SetStateAction<any>>
  dados: Record<string, string | number>
  erros: Record<string, string>
  opcoes: Array<Record<string | number, string | number>>
  nomeCampoChaveOpcoes: string
  nomeCampoDescricaoOpcoes: string
}

/**
 * Formata o Texto de Acordo com a Máscara Fornecida
 * @param label - Label do Texto - O que é exibido para o usuário
 * @param setState - setState do Conjunto de Dados
 * @param dados - Dados Atuais a serem atualizados pelo setState
 * @param campo - Nome do campo a ser atualizado no setState
 * @param erros - Objeto de Erro que caso exista o campo, será exibido
 * @returns void
 */
export default function InputSelect({
  label,
  setState,
  dados,
  field,
  erros,
  opcoes,
  nomeCampoChaveOpcoes,
  nomeCampoDescricaoOpcoes,
}: PropsInputInterface) {
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          htmlFor={field}
          sx={{ backgroundColor: "white", paddingX: 1 }}
        >
          {label}
        </InputLabel>

        <Select
          id={field}
          value={dados[field]}
          label={label}
          onChange={(evento) =>
            setState({ ...dados, [field]: evento.target.value })
          }
        >
          {opcoes.map((v, indice) => (
            <MenuItem key={indice} value={v[nomeCampoChaveOpcoes]}>
              {v[nomeCampoDescricaoOpcoes]}
            </MenuItem>
          ))}
        </Select>

        <Condicional condicao={typeof erros[field] !== "undefined"}>
          <FormHelperText sx={{ color: "red" }}>{erros[field]}</FormHelperText>
        </Condicional>
      </FormControl>
    </>
  )
}
