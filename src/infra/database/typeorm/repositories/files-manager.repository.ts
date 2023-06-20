import { InjectRepository } from "@nestjs/typeorm";
import { FilesManagerModel } from "src/domain/models/files-manager.model";
import { FilesManagerRepositoryInterface } from "src/domain/repositories/interfaces/files-manager-repository.interface";
import { FilesManagerEntity } from "../entities/files.entity";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";

@Injectable()
export class FilesManagerRepository implements FilesManagerRepositoryInterface {
  constructor(
    @InjectRepository(FilesManagerEntity)
    private readonly filesManagerRepository: BaseRepository<FilesManagerEntity>
  ) {}

  async getByFilename(filename: string): Promise<FilesManagerModel> {
    return this.filesManagerRepository.findOne({
      where: { file_name: filename },
    });
  }
  async alterState(filename: string, state: number): Promise<void> {
    await this.filesManagerRepository
      .createQueryBuilder()
      .update()
      .set({ state: state })
      .where("filename = :filename", { filename })
      .execute();
  }
  async create(filename: string): Promise<void> {
    await this.filesManagerRepository.save(
      this.filesManagerRepository.create({ file_name: filename, state: 1 })
    );
  }
}
