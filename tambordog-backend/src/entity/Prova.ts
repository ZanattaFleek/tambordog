import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PisoTypes } from '../types/PisoTypes';
import Inscricao from './Inscricao';
import Campeonato from './Campeonato';
import { ProvaTypes } from '../types/ProvaTypes';

@Entity({ name: 'provas' })
export default class Prova {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idProva: string;

  @Column({ length: 60 })
  nomeProva: string

  @Column({ length: 100 })
  endereco: string

  @Column()
  numero: number

  @Column({ length: 60 })
  bairro: string

  @Column({ length: 60 })
  cidade: string

  @Column({ length: 2 })
  uf: string

  @Column({ length: 10 })
  cep: string

  @Column({ length: 30 })
  localizacao: string

  @Column({ length: 255 })
  adicionais: string

  @Column({ type: 'enum', enum: PisoTypes })
  piso: PisoTypes

  @Column({ type: 'date' })
  dataProva: string

  @Column({ type: 'time' })
  horaProva: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorProva: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorProvaAte12: number

  @Column({
    length: 15,
    nullable: true,
  })
  telefone: string

  @Column({
    length: 15,
    nullable: true,
  })
  whatsapp: string

  @Column({
    length: 255,
    nullable: true,
  })
  email: string

  @Column({ type: 'enum', enum: ProvaTypes })
  status: ProvaTypes

  @OneToMany(() => Inscricao, (inscricao) => inscricao.prova)
  inscricoes: Inscricao[]

  @Column({ length: 36 })
  idCampeonato: string | null

  @JoinColumn({ name: 'idCampeonato' })
  @ManyToOne(() => Campeonato, (campeonato) => campeonato.provas)
  campeonato: Campeonato
}