import { FilesManagerModel } from "src/domain/models/files-manager.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files_manager")
export class FilesManagerEntity implements FilesManagerModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  file_name: string;

  @Column()
  state: number;
}
