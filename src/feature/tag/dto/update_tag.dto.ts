import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
