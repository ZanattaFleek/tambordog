import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CrudController } from "./crud.controller";
import { ProvaController } from "./controller/prova.controller";
import { AuthCrudMiddleware } from "./authCrud.middleware";
import { LoginUsuarioController } from "./controller/loginUsuario.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";
import { ContextoService } from "./services/contexto.service";

@Module({
  imports: [],
  controllers: [CrudController, ProvaController, LoginUsuarioController],
  providers: [ContextoService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCrudMiddleware)
      .forRoutes(CrudController)
  }
}
