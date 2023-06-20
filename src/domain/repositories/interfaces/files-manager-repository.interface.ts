import { FilesManagerModel } from "src/domain/models/files-manager.model";

export interface FilesManagerRepositoryInterface {
  getByFilename(filename: string): Promise<FilesManagerModel>;
  alterState(filename: string, state: number): Promise<void>;
  create(filename: string): Promise<void>;
}
