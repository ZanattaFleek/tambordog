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
