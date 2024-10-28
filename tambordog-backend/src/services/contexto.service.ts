import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ContextoService {

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