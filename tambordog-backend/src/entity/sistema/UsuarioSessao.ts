import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioSessaoInterface } from '../../interfaces/sistema/usuario.interface';

@Entity({ name: 'usuariosessoes' })
export default class UsuarioSessao implements UsuarioSessaoInterface {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idSessao: string;

  @Column({ length: 36 })
  idUsuario: string

  @Column({ length: 36 })
  token: string

  @Column({ nullable: true })
  ativo: boolean
}