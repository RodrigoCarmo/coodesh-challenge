import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseRepository<T> extends Repository<T> {}
