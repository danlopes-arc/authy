import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SomethingService } from './something.service';
import { CreateSomethingDto } from './dto/create-something.dto';
import { UpdateSomethingDto } from './dto/update-something.dto';

@Controller('something')
export class SomethingController {
  constructor(private readonly somethingService: SomethingService) {}

  @Post()
  create(@Body() createSomethingDto: CreateSomethingDto) {
    return this.somethingService.create(createSomethingDto);
  }

  @Get()
  findAll() {
    return this.somethingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.somethingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSomethingDto: UpdateSomethingDto) {
    return this.somethingService.update(+id, updateSomethingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.somethingService.remove(+id);
  }
}
