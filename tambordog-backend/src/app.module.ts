import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CrudController } from "./crud.controller";
import { ProvaController } from "./controller/prova.controller";
import { AuthCrudMiddleware } from "./authCrud.middleware";
import { LoginUsuarioController } from "./controller/loginUsuario.controller";

@Module({
  imports: [],
  controllers: [CrudController, ProvaController, LoginUsuarioController],
  providers: [],
})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCrudMiddleware)
      .forRoutes(CrudController)
  }
}
