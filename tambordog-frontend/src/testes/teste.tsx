import React, { useState } from "react"
import ComboBox from "../components/ComboBox"

export default function Teste() {
  const rsCampeonatos = [
    {
      idCampeonato: 1,
      nome: "Divinópolis",
    },
    {
      idCampeonato: 2,
      nome: "Itaúna",
    },
  ]

  const [dados, setDados] = useState({ codigoCampeonato: 1 })

  return (
    <>
      <ComboBox
        campoID="idCampeonato"
        campoDescricao="nome"
        dados={dados}
        setState={setDados}
        field="codigoCampeonato"
        label="Campeonato"
        opcoes={rsCampeonatos}
      />
    </>
  )
}
