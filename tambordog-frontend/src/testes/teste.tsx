import React, { useState } from "react"
import ComboBox from "../components/ComboBox"

export default function Teste() {
  const [rsCampeonatos, setRsCampeonatos] = useState<Array<any>>([])

  const [dados, setDados] = useState({ codigoCampeonato: 1 })

  const pesquisarCampeonatos = (descricao: string) => {
    setRsCampeonatos([
      {
        idCampeonato: 1,
        nome: "Liga Divinópolis 2024",
      },
      {
        idCampeonato: 2,
        nome: "Liga Amador Itaúna 2025",
      },
    ])
    console.log(descricao)
  }

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
        mensagemPadraoCampoEmBranco="Escolha o Campeonato"
        onClickPesquisa={(rs) => pesquisarCampeonatos(rs)}
      />

      <p>Campeonatos</p>
      {JSON.stringify(rsCampeonatos)}
      <p>Dados</p>
      {JSON.stringify(dados)}
    </>
  )
}
