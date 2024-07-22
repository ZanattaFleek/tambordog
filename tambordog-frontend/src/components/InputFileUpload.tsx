import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { disable } from "workbox-navigation-preload"
import Condicional from "./Condicional"
import { Typography } from "@mui/material"

interface PropsInterface {
  descricao: string
  setState?: React.Dispatch<React.SetStateAction<any>>
  field: string
  onChange?: (v: string) => void
  dados: {
    [key: string]: string | number | readonly string[] | undefined | any
  }
  disabled?: boolean
  accept: string
  tamanhoMaximoMBytesArquivo?: number
  erros?: { [key: string]: string }
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export default function InputFileUpload({
  descricao,
  dados,
  field,
  setState,
  onChange = undefined,
  disabled = false,
  accept = "",
  tamanhoMaximoMBytesArquivo = 0,
  erros = {},
}: PropsInterface) {
  const [erroTamanho, setErroTamanho] = useState("")

  const onChangeFileInput = (rs: React.ChangeEvent<HTMLInputElement>) => {
    if (rs.target.files) {
      if (
        tamanhoMaximoMBytesArquivo !== 0 &&
        rs.target.files[0].size / 1024 / 1024 > tamanhoMaximoMBytesArquivo
      ) {
        setErroTamanho(
          "Tamanho excede o limite de ".concat(
            tamanhoMaximoMBytesArquivo.toString(),
            "MB"
          )
        )
      } else {
        const reader = new FileReader()

        reader.onload = function (event) {
          if (event.target) {
            if (onChange) {
              onChange(event.target.result as string)
            } else if (setState) {
              const tmpDados = { ...dados }
              tmpDados[field] = event.target.result
              setState({ ...tmpDados })
            }
          }
        }

        reader.readAsDataURL(rs.target.files[0])
      }
    }
  }

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {descricao}
        <VisuallyHiddenInput
          accept={accept}
          type="file"
          disabled={disabled}
          onChange={onChangeFileInput}
        />
      </Button>

      <Condicional condicao={typeof erros[field] !== "undefined"}>
        <Typography variant="caption" textAlign="left" color="warning.main">
          {erros[field]}
        </Typography>
      </Condicional>

      <Condicional condicao={erroTamanho.length > 0}>
        <Typography variant="caption" textAlign="left" color="warning.main">
          {erroTamanho}
        </Typography>
      </Condicional>
    </>
  )
}
