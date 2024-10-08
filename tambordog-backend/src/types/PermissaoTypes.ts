export interface RoleInterface {
    modulo: string
    permissao: string
}

export interface SISTEMA_PERMISSOES_INTERFACE {

    PROVAS: {
        MODULO: string
        PERMISSOES: {
            LISTAR_PROVAS_EM_ABERTO: string
        }
    },

    CRUD_GENERICO: {
        MODULO: string
        PERMISSOES: {
            INCLUIR: string
            EXCLUIR: string
            ALTERAR: string
        }
    },

}

export const SISTEMA_PERMISSOES: SISTEMA_PERMISSOES_INTERFACE = {
    PROVAS: {
        MODULO: "Provas",
        PERMISSOES: {
            LISTAR_PROVAS_EM_ABERTO: "Listar Provas em Aberto"
        }
    },
    
    CRUD_GENERICO: {
        MODULO: "Crud Generico",
        PERMISSOES: {
            INCLUIR: "Incluir ",
            EXCLUIR: "Excluir ",
            ALTERAR: "Alterar "
        }
    }
}

