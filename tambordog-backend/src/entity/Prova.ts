import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PisoType } from "../types/PisoTypes";
// import Inscricao from "./Inscricao";
import Campeonato from "./Campeonato";
import { ProvaCategoriaInterface, ProvaInterface } from "../interfaces/prova.interfaces";
import { StatusProvaType } from "../types/ProvaTypes";
import { CategoriaInterface } from "../interfaces/categoria.interfaces";
import Categoria from "./Categoria";
import ProvaCategoria from "./ProvaCategoria";

@Entity({ name: "provas" })
export default class Prova implements ProvaInterface {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  idProva: string;

  @Column({ length: 60 })
  nomeProva: string;

  @Column({ length: 100 })
  endereco: string;

  @Column({ length: 60 })
  bairro: string;

  @Column({ length: 60 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ length: 10 })
  cep: string;

  @Column({ length: 10 })
  lat: string;

  @Column({ length: 10 })
  long: string;

  @Column({ type: "varchar", length: 2 })
  tipoPiso: PisoType;

  @Column({ type: "datetime" })
  dataHoraProva: string;

  @Column({ type: "float", precision: 2 })
  valorProva: number;

  @Column({ type: "float", precision: 2 })
  valorProvaAte12: number;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 15 })
  whatsapp: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: "text" })
  termoAceite: string;

  @Column({ length: 2 })
  status: StatusProvaType;

  @Column({ length: 36, nullable: true })
  idCampeonato: string | null;

  @Column({ type: "text" })
  imagem: string;

  /*
  @OneToMany(() => Inscricao, (inscricao) => inscricao.prova)
  Inscricoes: Inscricao[];
  */

  @JoinColumn({ name: "idCampeonato" })
  @ManyToOne(() => Campeonato, (campeonato) => campeonato.Provas)
  Campeonato: Campeonato;

  @JoinColumn({ name: "idProva" })
  @OneToMany(() => ProvaCategoria, (provaCategoria) => provaCategoria.prova, { cascade: true })
  provaCategorias: Array<ProvaCategoriaInterface>
}
