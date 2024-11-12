import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './decorators/roles.decorators';
import { Observable } from 'rxjs';
import { SISTEMA_PERMISSOES } from './types/PermissaoTypes';
import ContextoService from './services/contexto.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Antes do GET....')
        const roles = this.reflector.get(Roles, context.getHandler());
        const contexto = this.reflector.get(ContextoService, context.getHandler());

        // const contextoService = this.reflector.get(ContextoService, context.getHandler());
        // console.log('contextoService',this.request.headers)

        console.log('Dentro do Guarda de Permissões....')
        console.log('Valor do Contexto: ', contexto)
        // this.contextoService.setUsuario('Zanatta Dentro do Roles Guard....')

        // this.contextoService = new ContextoService(context.switchToHttp().getRequest())

        // const teste = context.switchToHttp().getRequest();

        // console.log('teste', teste)

        // console.log('Autorization', this.reflector.get('authorization', context.getHandler()))

        // console.log(context.getArgs())

        // console.log('Roles recebidos: ', roles)

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log('request', request.headers.authorization)

        if (!roles) {
            return true;
        } else {
            roles.forEach(regra => {
                if (regra.modulo === SISTEMA_PERMISSOES.CRUD_GENERICO.MODULO) {
                    if (regra.permissao === SISTEMA_PERMISSOES.CRUD_GENERICO.PERMISSOES.INCLUIR) {
                        console.log('Pesquisar e Retornar se Pode Incluir em ')
                        console.log(request.body.entidade)
                        return false
                    }
                }
            })
        }

        return request.headers.authorization === 'Bearer Zanatta';
    }
}