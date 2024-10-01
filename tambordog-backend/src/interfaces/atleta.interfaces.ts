export interface AtletaInterface {
  idAtleta?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  whatsapp: string;
  email: string;
  senha: string;
  ativo: boolean;
}

export interface AtletaSessaoInterface {
  idSessao?: string
  idAtleta: string
  token: string
  ativo: boolean
}
