import { IsString } from "class-validator";

export class GetByCodeDto {
  @IsString()
  code: string;
}
