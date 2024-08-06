import { PisoType } from "../types/PisoTypes";
import { StatusProvaType } from "../types/ProvaTypes";

export interface ProvaInterface {
  idProva?: string;
  idCampeonato: string | null;
  nomeProva: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  lat: string;
  long: string;
  tipoPiso: PisoType;
  dataHoraProva: string;
  valorProva: number;
  valorProvaAte12: number;
  telefone: string;
  whatsapp: string;
  email: string;
  status: StatusProvaType;
  termoAceite: string;
  imagem: string;
  provaCategorias: Array<ProvaCategoriaInterface>
}

export interface ProvaCategoriaInterface {
  idProvaCategoria?: string;
  idProva: string | null;
  idCategoria: string;
  qtdPistas: number;  
}
