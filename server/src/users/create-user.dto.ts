import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 6)
  username?: string;

  @IsNotEmpty()
  @Length(2, 4)
  password?: string;

  @IsInt()
  id?: number;
}
