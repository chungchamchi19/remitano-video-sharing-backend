import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Column } from "../database/dbAwareColumn";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  token?: string;

  @Column({ type: "timestamp" })
  expireAt?: Date;

  @Column()
  userId?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user?: User;
}
