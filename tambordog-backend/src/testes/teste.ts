import { LessThan, LessThanOrEqual } from "typeorm";
import { AppDataSource } from "../dataSource";
import Prova from "../entity/Prova";
import ProvaCategoria from "../entity/ProvaCategoria";
import { ProvaInterface } from "../interfaces/prova.interfaces";
import { PisoType } from "../types/PisoTypes";
import { StatusProvaType } from "../types/ProvaTypes";

AppDataSource.initialize().then(() => {
  //     relations: ['Categoria'],
  AppDataSource.getRepository(Prova).find({
    // relations: ['provaCategorias', 'provaCategorias.Categoria'],
    relations: ['Campeonato'],
    where: {
      valorProva: eval('<=10')
    }
  }).then(rs => {
    console.log(JSON.stringify(rs))
  })

})

// Data do Banco:
// 2024-07-26T03:46:00.000Z

// Transformar em Data para Usuário:
// 2025-02-11T10:00

/*
import { DateTime } from "luxon";

const original: string = "2024-07-26T11:46:55.000Z";

const conversao = DateTime.fromISO(original).toFormat("yyyy-MM-dd'T'HH:mm");


// const convertido = conversao.toFormat('yyyy-MM-dd').concat('T',conversao.toFormat('HH:mm'))

console.log("Conversao: ", conversao);

import axios from "axios";
import {
  PadraoCrudInterface,
  RespostaPadraoInterface,
} from "../interfaces/padrao.interfaces";

const data: PadraoCrudInterface = {
  entidade: "Raca",
  criterio: {
    nome: "%a%",
  },
  camposLike: ["nome"]
};

const config = {
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify(data),
};

axios
  .post<RespostaPadraoInterface<Array<any>>>(
    "http://localhost:4000/consultar",
    config
  )
  .then((rs) => {
    console.log(rs.data.dados);
  });
*/
