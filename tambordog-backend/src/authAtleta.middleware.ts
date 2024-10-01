// Autenticação Específica para rotas Atleta

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthAtletaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Atleta...');
    console.log('req.headers.authorization', req.headers.authorization)
    next();
  }
}
