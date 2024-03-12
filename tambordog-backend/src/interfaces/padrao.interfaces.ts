export interface RespostaPadraoInterface<T> {
  ok: boolean;
  mensagem: string;
  dados?: T;
}
