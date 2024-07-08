export enum SumulaType {
  eliminado = 0,
  aguardando = 1,
  pistaConcluida = 2,
}

export const SumulaTypes = [
  {
    idSumula: SumulaType.aguardando,
    descricao: "Aguardando",
  },
  {
    idSumula: SumulaType.eliminado,
    descricao: "Eliminado",
  },
  {
    idSumula: SumulaType.pistaConcluida,
    descricao: "Pista Concluída",
  },
];
