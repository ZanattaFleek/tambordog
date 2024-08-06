export interface RespostaPadraoInterface<T> {
  ok: boolean
  mensagem: string
  dados?: T
}

export interface PadraoCrudInterface {
  entidade: string
  criterio: Record<string, any>
  camposLike?: Array<string>
  select?: Array<string>
  relations?: Array<string>
}
