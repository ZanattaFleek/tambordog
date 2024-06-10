export interface CampeonatoInterface {
  idCampeonato: string
  nome: string
  descritivo: string
  ativo: boolean
  informativo: string
}

export interface CampeonatoCategoriaInterface {
  idCampeonato: string
  idCategoria: string
  qtdPistas: number
}
