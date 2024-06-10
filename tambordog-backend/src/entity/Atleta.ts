import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cao from './Cao';
// import Inscricao from './Inscricao';
import { AtletaInterface } from '../interfaces/atleta.interfaces';

@Entity({ name: 'atletas' })
export default class Atleta implements AtletaInterface {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idAtleta: string;

  @Column({ length: 50 })
  nome: string

  @Column({ length: 14 })
  cpf: string

  @Column({ type: 'date' })
  dataNascimento: string

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

  @Column({ length: 255 })
  email: string

  @Column({ length: 25 })
  senha: string

  @Column({ nullable: true })
  ativo: boolean

  //  @Column({ nullable: true })
  // avatar: string

  @OneToMany(() => Cao, (cao) => cao.atleta)
  caes: Cao[]

  /*
  @OneToMany(() => Inscricao, (inscricao) => inscricao.atleta)
  inscricoes: Inscricao[]
  */

}