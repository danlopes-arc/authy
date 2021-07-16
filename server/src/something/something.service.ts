import { Injectable } from '@nestjs/common';
import { CreateSomethingDto } from './dto/create-something.dto';
import { UpdateSomethingDto } from './dto/update-something.dto';

@Injectable()
export class SomethingService {
  create(createSomethingDto: CreateSomethingDto) {
    return 'This action adds a new something';
  }

  findAll() {
    return `This action returns all something`;
  }

  findOne(id: number) {
    return `This action returns a #${id} something`;
  }

  update(id: number, updateSomethingDto: UpdateSomethingDto) {
    return `This action updates a #${id} something`;
  }

  remove(id: number) {
    return `This action removes a #${id} something`;
  }
}
