import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { AtletaSessaoInterface } from '../interfaces/atleta.interfaces';

@Entity({ name: 'atletasessoes' })
export default class AtletaSessao implements AtletaSessaoInterface {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idSessao: string;

  @Column({ length: 36 })
  idAtleta: string

  @Column({ length: 36 })
  token: string

  @Column({ nullable: true })
  ativo: boolean
}