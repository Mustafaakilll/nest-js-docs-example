import { IsInt, IsString } from 'class-validator';

class CreateCatDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
