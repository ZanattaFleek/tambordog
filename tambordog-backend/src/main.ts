import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppDataSource } from "./dataSource";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ["http://localhost:3000"] });
  await AppDataSource.initialize();
  await app.listen(4000);
}
bootstrap();

/*
import { Like } from "typeorm";
import { AppDataSource } from "./dataSource";
import Raca from "./entity/Raca";

AppDataSource.initialize().then(() => {
  console.log("Conectado!!!");
  
  AppDataSource.getRepository(Raca)
  .find({
      where: {
        nome: Like("%a%"),
      },
    })
    .then((rs) => {
      console.log(rs);
    });
});

    */
