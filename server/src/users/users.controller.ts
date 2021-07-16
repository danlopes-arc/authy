import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { classToPlain } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return classToPlain(user);
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) userData: CreateUserDto,
  ): Promise<Partial<User>> {
    const user = await this.usersService.findOne({
      username: userData.username,
    });
    if (user) {
      throw new BadRequestException();
    }
    return classToPlain(user);
  }
}
