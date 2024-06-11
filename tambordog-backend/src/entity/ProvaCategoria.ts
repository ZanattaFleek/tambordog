import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProvaCategoriaInterface } from "../interfaces/prova.interfaces";

@Entity({ name: "provascategorias" })
export default class ProvaCategoria implements ProvaCategoriaInterface {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  idProvaCategoria: string;

  @Column({ length: 36, nullable: true })
  idProva: string;

  @Column({ length: 36, nullable: true })
  idCategoria: string;

  @Column({ default: 1 })
  qtdPistas: number;
}
