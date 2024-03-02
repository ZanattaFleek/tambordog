import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Cao from "./Cao";

@Index("atleta_uf_cidade", ["uf", "cidade"])
@Entity()
export default class Atleta {
  @PrimaryGeneratedColumn()
  idAtleta: number;

  @Column({ length: 50 })
  nome: string;

  @Index({ unique: true })
  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 15 })
  whatsAPP: string;

  @Column({ length: 50 })
  endereco: string;

  @Column({ length: 40 })
  bairro: string;

  @Column({ length: 40 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ type: "date" })
  dataNascimento: string;

  @Column({ length: 255 })
  email: string;
  
  @OneToMany(() => Cao, (cao) => cao.idAtleta)
  caes: Cao[];
  
  /*
  @OneToMany(() => Cao, (cao) => cao.atleta)
  caes: Cao[];
  */
}
