import React, { useState, useRef } from "react"
import FormControl from "@mui/material/FormControl"
import {
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
  Icon,
} from "@mui/material"
import { useTheme } from "@mui/material"
import Condicional from "./Condicional"

interface mapKeyPressInterface {
  key: string
  onKey: (pesquisa: string) => void
}

interface ComboBoxInterface<T> {
  /** identificador do componente */
  id?: string
  /** Descrição que irá aparecer no campo. */
  label: string
  /** Array de Objeto de Dados. Será utilizado no SetState como conjunto de dados */
  dados: {
    [key: string]: string | number | readonly string[] | undefined | any
  }
  /** Array de Objeto de Opções que serão apresentadas no ComboBox. */
  opcoes: Array<{
    [key: string]: string | number | readonly string[] | undefined | any
  }>
  /** Nome do CampoID, dentro de @opcoes, que será utilizado como Value. */
  campoID: string
  /** Nome do Campo Descrição, dentro de @opcoes, que será apresentado ao usuário no ComboBox. */
  campoDescricao: string
  /** Campo dentro de @dados que será atribuído o valor do CampoID de @opcoes */
  field: string
  /** CallBack de setState de Dados - Utilizado somente quando OnChange for omitido*/
  setState?: React.Dispatch<React.SetStateAction<any>>
  /** Desabilitar seleção / Campo */
  disabled?: boolean
  /** PlaceHolder Padrão HTML */
  placeholder?: string
  /** Mapeamento de Funções KeyPress, recebe o código da tecla + função de CallBack (onkey) */
  mapKeyPress?: Array<mapKeyPressInterface>
  /** Conjunto de Erros - Recebe o campoID como chave */
  erros?: { [key: string]: string }
  /** CallBack de OnChange - não é realizado setState em caso de envio deste CallBack */
  onChange?: (v: T) => void
  /** Valor Padrão Quando Não Selecinada Opção */
  valorPadraoCampoEmBranco?: number | string
  /** Mensagem Exibida Quando Não Selecinada Opção */
  mensagemPadraoCampoEmBranco?: string
  /** Função pra Detecção de KeyDown */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined
  /** Se permite uma opção fora da caixa de pesquisa / grupo de opções fornecidos - usuário digita nova opção */
  permitirNovaOpcao?: boolean
  /** Formatação do valor apresentado como option - Caso contrário apresenta o campo option[campoDescricao] */
  formatarOption?: (opcao: T) => string
  /* Quando Teclar ENTER ou clicar no ícone de pesquisa */
  onClickPesquisa?: (v: string) => void
}

const onKey = (
  key: string,
  mapKeyPress: Array<mapKeyPressInterface>,
  pesquisa: string
) => {
  if (mapKeyPress.length > 0) {
    let encontrou: boolean = false
    for (
      let contador: number = 0;
      contador < mapKeyPress.length && !encontrou;
      contador++
    ) {
      if (mapKeyPress[contador].key === key) {
        encontrou = true
        mapKeyPress[contador].onKey(pesquisa)
      }
    }
  }
}

export default function ComboBox<T>({
  id,
  label,
  dados,
  opcoes,
  campoID,
  campoDescricao,
  field,
  setState,
  disabled = false,
  placeholder = label,
  mapKeyPress = [],
  erros = {},
  onChange,
  valorPadraoCampoEmBranco = 0,
  mensagemPadraoCampoEmBranco = "Escolha Uma Opção",
  onKeyDown,
  permitirNovaOpcao = false,
  formatarOption = undefined,
  onClickPesquisa = undefined,
}: ComboBoxInterface<T>) {
  const exibirIconePesquisa = () => {
    return (
      <InputAdornment position="start">
        <IconButton
          sx={{ margin: 0, padding: 0 }}
          onClick={() => {
            if (onClickPesquisa) onClickPesquisa(pesquisa)
          }}
        >
          <Icon sx={{ margin: 10, padding: 10 }}>search</Icon>
        </IconButton>
      </InputAdornment>
    )
  }

  const [pesquisa, setPesquisa] = useState("")

  const theme = useTheme()

  const chaveLista = useRef(0)

  return (
    <>
      <Autocomplete
        clearOnEscape
        disabled={disabled}
        value={dados[field]}
        disablePortal
        id={id}
        onKeyDown={onKeyDown}
        getOptionLabel={(opcao) => {
          if (typeof opcao === "number" && opcao === valorPadraoCampoEmBranco) {
            return mensagemPadraoCampoEmBranco
          } else if (typeof opcao === "number") {
            const retorno = opcoes.find((v) => {
              return v[campoID] === opcao
            })

            return retorno ? retorno[campoDescricao] : "Sem Correspondência"
          } else if (typeof opcao === "string") {
            const retorno = opcoes.find((v) => {
              return v[campoID] === opcao
            })

            return typeof retorno == "object" ? retorno[campoDescricao] : opcao
          } else if (typeof opcao === "object" && opcao[campoDescricao]) {
            return opcao[campoDescricao]
          } else {
            return "Erro na Opção...."
          }
        }}
        onChange={(_e, v) => {
          if (onChange) {
            onChange(v)
          } else if (setState) {
            const tmpDados = { ...dados }
            tmpDados[field] = v ? v[campoID] : valorPadraoCampoEmBranco
            setState({ ...tmpDados })
          }
        }}
        isOptionEqualToValue={(opcao, valor) => {
          const retorno = permitirNovaOpcao
            ? true
            : valor
            ? opcao[campoID] ===
              (typeof valor === "object" ? valor[campoID] : valor)
            : true
          return retorno
        }}
        options={opcoes}
        renderOption={(props, option) => {
          return (
            <li {...props} key={++chaveLista.current}>
              {formatarOption ? formatarOption(option) : option[campoDescricao]}
            </li>
          )
        }}
        inputValue={pesquisa}
        onInputChange={(
          _event: React.SyntheticEvent,
          value: string,
          reason: string
        ) => {
          if (value) {
            setPesquisa(value)
          } else {
            setPesquisa("")
          }
        }}
        renderInput={(params) => (
          <FormControl sx={{ width: "100%" }}>
            <Condicional
              condicao={typeof label === "string" && label.length > 0}
            >
              <Typography
                variant="body2"
                textAlign="left"
                sx={{ mt: theme.inputs.marginTop }}
              >
                {label}
              </Typography>
            </Condicional>

            <TextField
              {...params}
              size="small"
              placeholder={placeholder}
              type="text"
              InputProps={{
                ...params.InputProps,
                startAdornment: <>{exibirIconePesquisa()}</>,
              }}
              onKeyDown={(ev) => onKey(ev.key, mapKeyPress, pesquisa)}
            />

            <Condicional condicao={typeof erros[field] !== "undefined"}>
              <Typography
                variant="caption"
                textAlign="left"
                color="warning.main"
              >
                {erros[field]}
              </Typography>
            </Condicional>
          </FormControl>
        )}
      />
    </>
  )
}
