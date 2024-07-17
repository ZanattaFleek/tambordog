export enum StatusProvaType {
  inscAberta = "RI",
  inscEncerrada = "IE",
  emAndamento = "EA",
  concluida = "CL",
  cancelada = "CC",
  suspensa = "SS",
}

export const StatusProvaTypes = [
  {
    idStatusProva: StatusProvaType.inscAberta,
    descricao: "Inscrições Abertas",
  },
  {
    idStatusProva: StatusProvaType.inscEncerrada,
    descricao: "Inscrições Encerradas",
  },
  {
    idStatusProva: StatusProvaType.emAndamento,
    descricao: "Em Andamento",
  },
  {
    idStatusProva: StatusProvaType.concluida,
    descricao: "Concluída",
  },
  {
    idStatusProva: StatusProvaType.cancelada,
    descricao: "Cancelada",
  },
  {
    idStatusProva: StatusProvaType.suspensa,
    descricao: "Suspensa",
  },
];
