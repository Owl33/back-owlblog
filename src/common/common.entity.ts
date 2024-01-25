import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from "typeorm";

export class CommonEntity {
  @CreateDateColumn({ type: "timestamp", nullable: false })
  creation_at: Date;
  @UpdateDateColumn({ type: "timestamp", nullable: true })
  update_at: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  delete_at: Date;
  @Column("tinyint", { unique: false, nullable: false })
  is_delete: number;
}
