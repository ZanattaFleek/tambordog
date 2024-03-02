import { Controller, Get, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/Fleek')
  getHello(): string {
    return 'Fleek Cursos';
  }

  @Get('/Aula')
  getAula(): string {
    return 'Aula da Fleek';
  }

  @Put('/Aula')
  putAula(): string {
    return 'Aula da Fleek';
  }
}
