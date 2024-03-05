import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cao from './Cao';
import Inscricao from './Inscricao';

@Entity({ name: 'categorias' })
export default class Categoria {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  idCategoria: string;

  @Column({ length: 35 })
  nome: string

  @Column({ length: 255 })
  observacao: string

  @OneToMany(() => Cao, (cao) => cao.categoria)
  caes: Cao[]

  @OneToMany(() => Inscricao, (inscricao) => inscricao.categoria)
  inscricoes: Inscricao[]
}