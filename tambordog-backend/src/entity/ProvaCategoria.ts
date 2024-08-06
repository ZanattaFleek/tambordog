import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProvaCategoriaInterface, ProvaInterface } from "../interfaces/prova.interfaces";
import Prova from "./Prova";
import Categoria from "./Categoria";

@Entity({ name: "provascategorias" })
export default class ProvaCategoria implements ProvaCategoriaInterface {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  idProvaCategoria: string;

  @Column({ length: 36, nullable: true })
  idProva: string;

  @Column({ length: 36, nullable: true })
  idCategoria: string;

  @JoinColumn({ name: "idCategoria" })
  @ManyToOne(() => Categoria)
  Categoria: Categoria;

  @Column({ default: 1 })
  qtdPistas: number;

  @JoinColumn({ name: "idProva" })
  @ManyToOne(() => Prova, (prova) => prova.provaCategorias)
  prova: ProvaInterface
}
