export interface GrupoInterface {
    idGrupo?: string
    nome: string
}

export interface GrupoUsuario {
    idGrupo: string
    idUsuario: string
}

export interface GrupoPermissao {
    idGrupo: string
    modulo: string // Provas
    permissao: string // Listar Provas em Aberto
}