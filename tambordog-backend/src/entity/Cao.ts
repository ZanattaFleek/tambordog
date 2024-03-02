import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { PorteTypes } from "../types/CaoTypes";
import Atleta from "./Atleta";

@Entity()
export default class Cao {
  @PrimaryGeneratedColumn()
  idCao: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ type: "enum", enum: PorteTypes })
  porte: PorteTypes;

  @ManyToOne(() => Atleta)
  @JoinColumn({ name: "idAtleta" })
  @Column()
  idAtleta: number;

  /*
  @JoinColumn({ name: "idAtleta" })
  @ManyToOne(() => Atleta, (atleta) => atleta.caes)
  atleta: Atleta;
  */
}
