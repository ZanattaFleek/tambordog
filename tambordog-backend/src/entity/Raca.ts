import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cao from './Cao';
import { RacaInterface } from '../interfaces/raca.interfaces';

@Entity({ name: 'racas' })
export default class Raca implements RacaInterface {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idRaca: string;

  @Column({ length: 35 })
  nome: string

  @OneToMany(() => Cao, (cao) => cao.raca)
  caes: Cao[]
}