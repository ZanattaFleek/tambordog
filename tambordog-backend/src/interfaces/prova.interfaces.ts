import { PisoTypes } from "../types/PisoTypes";
import { StatusProvaType } from "../types/ProvaTypes";

export interface ProvaInterface {
  idProva: string;
  nomeProva: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  lat: string;
  long: string;
  tipoPiso: PisoTypes;
  dataHoraProva: string;
  valorProva: number;
  valorProvaAte12: number;
  telefone: string;
  whatsapp: string;
  email: string;
  observacao: string;
  status: StatusProvaType;
  idCampeonato: string | null;
}
