import { PartialType } from '@nestjs/mapped-types';
import { CreateSomethingDto } from './create-something.dto';

export class UpdateSomethingDto extends PartialType(CreateSomethingDto) {}
