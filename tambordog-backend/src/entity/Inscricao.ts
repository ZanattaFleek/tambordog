import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import Sumula from './Sumula';
// import Categoria from './Categoria';
// import Prova from './Prova';
// import Atleta from './Atleta';
import Cao from './Cao';
import { InscricaoType } from '../types/InscricaoTypes';

@Entity({ name: 'inscricoes' })
export default class Inscricao {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idInscricao: string;

  // @PrimaryColumn({ type: 'uuid', length: 36 })
  // idAtleta: string;

  // @PrimaryColumn({ type: 'uuid', length: 36 })
  // idCao: string;

  @Column({ length: 36 })
  idAtleta: string

  /*

  @JoinColumn({ name: 'idAtleta' })
  @ManyToOne(() => Atleta, (atleta) => atleta.inscricoes)
  atleta: Atleta
  
  @Column({ length: 36 })
  idCao: string
  
  @JoinColumn({ name: 'idCao' })
  @ManyToOne(() => Cao, (cao) => cao.inscricoes)
  cao: Cao
  */

  @Column({ length: 36 })
  idCategoria: string
/*
  @JoinColumn({ name: 'idCategoria' })
  @ManyToOne(() => Categoria, (categoria) => categoria.Inscricoes)
  categoria: Categoria
*/
  @Column({ length: 36 })
  idProva: string

  /*
  @JoinColumn({ name: 'idProva' })
  @ManyToOne(() => Prova, (prova) => prova.Inscricoes)
  prova: Prova
  */

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @Column({ type: 'enum', enum: InscricaoType })
  statusInscricao: InscricaoType

  @OneToOne(() => Sumula, sumula => sumula.inscricao)
  @JoinColumn({ name: 'idSumula' })
  sumula: Sumula


}