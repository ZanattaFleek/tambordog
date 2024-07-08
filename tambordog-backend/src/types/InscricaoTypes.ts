export enum InscricaoType {
  PendentePagamento = 0,
  Desclassificado = 1,
  Inscrito = 2,
  Eliminado = 3,
}

export const InscricaoTypes = [
  {
    idInscricao: InscricaoType.PendentePagamento,
    descricao: "Pagamento Pendente",
  },
  {
    idInscricao: InscricaoType.Desclassificado,
    descricao: "Desclassificado",
  },
  {
    idInscricao: InscricaoType.Inscrito,
    descricao: "Inscrito",
  },
  {
    idInscricao: InscricaoType.Eliminado,
    descricao: "Eliminado",
  },
];
