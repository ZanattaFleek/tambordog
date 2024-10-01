export interface UsuarioInterface {
    idUsuario?: string
    nome: string
    cpf: string
    senha: string
    ativo: boolean
    tentativasLogin: number
}

export interface UsuarioSessaoInterface {
    idSessao?: string
    idUsuario: string
    token: string
    ativo: boolean
}