import { DataSource } from "typeorm";
import Cao from "./entity/Cao";
import Atleta from "./entity/Atleta";
import Categoria from "./entity/Categoria";
// import Inscricao from "./entity/Inscricao";
import Prova from "./entity/Prova";
import Raca from "./entity/Raca";
// import Sumula from "./entity/Sumula";
import Campeonato from "./entity/Campeonato";
import ProvaCategoria from "./entity/ProvaCategoria";
import AtletaSessao from "./entity/AtletaSessao";
import Usuario from "./entity/sistema/Usuario";
import UsuarioSessao from "./entity/sistema/UsuarioSessao";

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
    AtletaSessao,
    Categoria,
    Campeonato,
    // Inscricao,
    Prova,
    ProvaCategoria,
    Raca,
    Usuario,
    UsuarioSessao
    // Sumula,
  ],
  subscribers: [],
  migrations: [],
});
