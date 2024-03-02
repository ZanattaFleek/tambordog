import React, { useState } from "react"
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import Condicional from "./Condicional"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

interface PropsInterface {
  label: string
  campo: string
  setDados: React.Dispatch<React.SetStateAction<any>>
  dados: Record<string, string | number>
  erros: Record<string, string>
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
export default function InputPassword({
  label,
  campo,
  setDados,
  dados,
  erros,
}: PropsInterface) {
  const [exibirSenha, setExibirSenha] = useState("password")

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel
        htmlFor={campo}
        sx={{ backgroundColor: "white", paddingX: 1 }}
      >
        {label}
      </InputLabel>

      <OutlinedInput
        type={exibirSenha}
        id={campo}
        value={dados[campo]}
        onChange={(evento) =>
          setDados({ ...dados, [campo]: evento.target.value })
        }
        endAdornment={
          <InputAdornment position="start">
            <Condicional condicao={exibirSenha === "text"}>
              <VisibilityIcon onClick={() => setExibirSenha("password")} />
            </Condicional>

            <Condicional condicao={exibirSenha === "password"}>
              <VisibilityOffIcon onClick={() => setExibirSenha("text")} />
            </Condicional>
          </InputAdornment>
        }
      />

      <Condicional condicao={typeof erros[campo] !== "undefined"}>
        <FormHelperText sx={{ color: "red" }}>{erros[campo]}</FormHelperText>
      </Condicional>
    </FormControl>
  )
}

/*

        inputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Condicional condicao={exibirSenha === "text"}>
                <VisibilityIcon onClick={() => setExibirSenha("password")} />
              </Condicional>

              <Condicional condicao={exibirSenha === "password"}>
                <VisibilityOffIcon onClick={() => setExibirSenha("text")} />
              </Condicional>
            </InputAdornment>
          ),
        }}

        */
