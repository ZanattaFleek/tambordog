import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Prova from "./Prova";
import { CampeonatoInterface } from "../interfaces/campeonato.interfaces";

@Entity({ name: "campeonatos" })
export default class Campeonato implements CampeonatoInterface {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  idCampeonato: string;

  @Column({ length: 35 })
  nome: string;

  @Column({ type: "text" })
  descritivo: string;

  @Column({ nullable: true })
  ativo: boolean;

  @Column({ length: "150" })
  pdfFile: string;

  @OneToMany(() => Prova, (prova) => prova.Campeonato)
  Provas: Prova[];
}
