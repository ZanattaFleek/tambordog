// Autenticação Específica para rotas Admins

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Pegar o Token
    // Verficar se o Token é válido
    // Verificar se tem Permissao....
    console.log('Request Admin...');
    next();
  }
}
