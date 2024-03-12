import { Module } from "@nestjs/common";
import { CategoriaController } from "./categoria.controller";
// import { CategoriaController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [CategoriaController],
  providers: [],
})
export class AppModule {}
