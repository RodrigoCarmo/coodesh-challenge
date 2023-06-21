import { FilesManagerModel } from "src/domain/models/files-manager.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("files_manager")
export class FilesManagerEntity implements FilesManagerModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  file_name: string;

  @Column()
  state: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
