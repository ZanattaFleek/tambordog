import { Reflector } from '@nestjs/core';
import { RoleInterface } from '../types/PermissaoTypes';

export const Roles = Reflector.createDecorator<Array<RoleInterface>>();
