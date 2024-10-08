// Autenticação Específica para rotas Admins

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthCrudMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    // Pegar o Token
    // Verficar se o Token é válido
    // Verificar se tem Permissao....
    console.log('Request Admin Teste...');

    console.log('URL: ', req.url)

    next();
  }
}
