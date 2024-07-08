export enum PagamentoType {
  aberto = "A",
  pagamento_automatico = "PA",
  pagamento_manual = "PM",
}

export const PagamentoTypes = [
  {
    idTipoPagamento: PagamentoType.aberto,
    descricao: "Em Aberto",
  },
  {
    idTipoPagamento: PagamentoType.pagamento_automatico,
    descricao: "Pagamento Automático",
  },
  {
    idTipoPagamento: PagamentoType.pagamento_automatico,
    descricao: "Pagamento Manual",
  },
];
