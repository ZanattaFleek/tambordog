import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Inscricao from './Inscricao';
import { SumulaType } from '../types/SumulaTypes';

@Entity({ name: 'sumulas' })
export default class Sumula {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idSumula: string;

  @OneToOne(() => Inscricao, inscricao => inscricao.sumula)
  inscricao: Inscricao;

  @Column({ type: 'timestamp' })
  tempoPista: Date

  @Column({ type: 'timestamp' })
  penalidade: Date

  @Column({ type: 'timestamp' })
  classificacao: Date

  @Column({ type: 'datetime' })
  dataHoraApuracao: Date

  @Column({ type: 'int' })
  ordemEntrada: number

  @Column({ type: 'enum', enum: SumulaType })
  statusSumula: SumulaType
}