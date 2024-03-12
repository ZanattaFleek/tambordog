import { AppDataSource } from "./dataSource";
import Atleta from "./entity/Atleta";

/*
import ClsAtleta from "./crud/clsAtleta";
import Atleta from "./entity/Atleta";
import Cao from "./entity/Cao";
import { PorteTypes } from "./types/CaoTypes";
*/

AppDataSource.initialize()
  .then(() => {

    /*
    AppDataSource.getRepository(Atleta).findOne({ where: { idAtleta: 1 } }).then( rsAtleta => {

      console.log(rsAtleta.caes)

    });

    const clsAtleta = new ClsAtleta();

    const novoAtleta = new Atleta();
    const novoCao = new Cao();

    novoAtleta.nome = "Frank";

    novoCao.nome = "Amora";
    novoCao.porte = PorteTypes.medio;

    novoAtleta.caes = [novoCao];

    clsAtleta.incluir(novoAtleta);
    */
  })
  .catch((err) => {
    console.log("Erro ao Inicializar o Data Source", err.message);
  });
