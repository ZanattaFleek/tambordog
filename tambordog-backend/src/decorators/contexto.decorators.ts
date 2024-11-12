import { Reflector } from '@nestjs/core';
import ContextoService from '../services/contexto.service';

export const Contexto = Reflector.createDecorator<typeof ContextoService>();
