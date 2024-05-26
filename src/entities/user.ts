import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./token";
import { Movie } from "./movie";
import { Column } from "../database/dbAwareColumn";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @OneToMany(() => Token, (token) => token.user, { onDelete: "CASCADE" }) tokens?: Token[];

  @OneToMany(() => Movie, (movie) => movie.user, { onDelete: "CASCADE" }) movies?: Token[];
}
