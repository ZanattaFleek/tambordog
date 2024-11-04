import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export default class ContextoService {

    private usuario: string = 'Frank'

    /*
    constructor(@Inject(REQUEST) private request: Request) {
        console.log('Constructor Contexto Service ')
    }
        */

    public setUsuario(qual: string) {
        this.usuario = qual
    }

    public getUsuario() {
        return this.usuario
    }

}