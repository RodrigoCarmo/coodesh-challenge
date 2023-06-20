import { FilesManagerModel } from "src/domain/models/files-manager.model";

export interface FilesManagerRepositoryInterface {
  getByFilename(filename: string): Promise<FilesManagerModel>;
  create(filename: string): Promise<void>;
}
