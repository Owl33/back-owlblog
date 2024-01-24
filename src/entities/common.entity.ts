import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export class CommonEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  post_id: string;

  @CreateDateColumn({ type: "timestamp" })
  creation_at: Date;
  @UpdateDateColumn({ type: "timestamp", nullable: true })
  update_at: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  delete_at: Date;
}
