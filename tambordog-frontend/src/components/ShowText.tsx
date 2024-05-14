import React from "react"
import { Link, Typography } from "@mui/material"
import Condicional from "./Condicional"
import ClsFormatacao from "../utils/ClsFormatacao"

interface PropsInterface {
  titulo: string
  descricao: string
  tipo?: "texto" | "whatsapp"
}

export default function ShowText({
  titulo,
  descricao,
  tipo = "texto",
}: PropsInterface) {
  return (
    <>
      <Typography variant="button" color="secondary">
        {titulo}
        <Condicional condicao={tipo === "texto"}>
          <Typography variant="body2" color="primary">
            {descricao}
          </Typography>
        </Condicional>
        <Condicional condicao={tipo === "whatsapp"}>
          <Link target="_blank"
            href={"https://wa.me/55".concat(
              new ClsFormatacao().somenteNumeros(descricao)
            )}
          >
            {descricao}
          </Link>
        </Condicional>
      </Typography>
    </>
  )
}
