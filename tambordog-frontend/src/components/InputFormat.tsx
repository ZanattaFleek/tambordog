import React, { forwardRef } from "react"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material"

import { IMaskInput } from "react-imask"
import Condicional from "./Condicional"

interface PropsInputInterface {
  label: string
  mask?: string
  campo: string
  setDados: React.Dispatch<React.SetStateAction<any>>
  dados: Record<string, string | number>
  erros: Record<string, string>
  type?: string
}

const MASK_DEFINITIONS = {
  "0": /[0-9]/,
  X: /[A-Z]/,
  x: /[a-z]/,
  a: /[A-Za-z]/,
  "*": /[A-Za-z0-9 ]/,
  l: /[A-Za-z0-9#@$%&*(){}!]/,
}

const MaskCustom = forwardRef((props: any, ref: any) => {
  const { onChange, mask, ...other } = props

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={MASK_DEFINITIONS}
      inputRef={ref}
      onAccept={(value: any) => {
        onChange({ target: { name: props.name, value } })
      }}
      overwrite
    />
  )
})

/**
 * Formata o Texto de Acordo com a Máscara Fornecida
 * @param label - Label do Texto - O que é exibido para o usuário
 * @param mask - Máscara a ser aplicada
 * @param setDados - setState do Conjunto de Dados
 * @param dados - Dados Atuais a serem atualizados pelo setState
 * @param campo - Nome do campo a ser atualizado no setState
 * @param erros - Objeto de Erro que caso exista o campo, será exibido
 * @returns void
 */
export default function InputFormat({
  label,
  mask,
  setDados,
  dados,
  campo,
  erros,
  type = "text",
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
        <OutlinedInput
          id={campo}
          onChange={(evento) =>
            setDados({ ...dados, [campo]: evento.target.value })
          }
          value={dados[campo]}
          inputProps={{ mask: mask }}
          inputComponent={mask ? MaskCustom : undefined}
          type={type}
        />

        <Condicional condicao={typeof erros[campo] !== "undefined"}>
          <FormHelperText sx={{ color: "red" }}>{erros[campo]}</FormHelperText>
        </Condicional>
      </FormControl>
    </>
  )
}
