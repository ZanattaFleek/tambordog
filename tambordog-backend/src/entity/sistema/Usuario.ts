import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioInterface } from '../../interfaces/sistema/usuario.interface';

@Entity({ name: 'usuarios' })
export default class Usuario implements UsuarioInterface {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idUsuario: string;

  @Column({ length: 50 })
  nome: string

  @Column({ length: 14 })
  cpf: string

  @Column({ length: 25 })
  senha: string

  @Column({ nullable: true })
  ativo: boolean

  @Column({ type: 'int', default: 0 })
  tentativasLogin: number

}