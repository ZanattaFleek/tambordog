import { DataSource } from "typeorm";
import Cao from "./entity/Cao";
import Atleta from "./entity/Atleta";
import Categoria from "./entity/Categoria";
import Inscricao from "./entity/Inscricao";
import Prova from "./entity/Prova";
import Raca from "./entity/Raca";
import Sumula from "./entity/Sumula";
import Campeonato from "./entity/Campeonato";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "66.94.105.135",
  port: 3306,
  username: "fsd0043",
  password: "FleekPass@2023a",
  database: "producao_tambordog",
  synchronize: true,
  logging: false,
  entities: [
    Cao,
    Atleta,
    Categoria,
    Campeonato,
    Inscricao,
    Prova,
    Raca,
    Sumula,
  ],
  subscribers: [],
  migrations: [],
});
