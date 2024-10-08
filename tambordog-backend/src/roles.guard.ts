import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './decorators/roles.decorators';
import { Observable } from 'rxjs';
import { SISTEMA_PERMISSOES } from './types/PermissaoTypes';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());

        // const teste = context.switchToHttp().getRequest();

        // console.log('teste', teste)

        // console.log('Autorization', this.reflector.get('authorization', context.getHandler()))

        // console.log(context.getArgs())

        // console.log('Roles recebidos: ', roles)

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // console.log('request', request.headers.authorization)

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