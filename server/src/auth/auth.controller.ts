import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { ValidationError } from '../utils/exceptions';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  login(@Request() req: ExpressRequest): { token: string } {
    const token = this.authService.generateToken(req.user as User);
    return { token };
  }

  @Post('register')
  async register(@Body() userData: User): Promise<Partial<User>> {
    const userExists = await this.usersService.exists({
      username: userData.username,
    });

    if (userExists) {
      throw new BadRequestException({
        field: 'username',
        message: 'Username already exists',
      });
    }

    try {
      const user = User.make(userData);
      user.password = await bcrypt.hash(userData.password, 12);

      await this.usersService.save(user);

      return classToPlain(user);
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new BadRequestException({
          field: err.field,
          message: err.message,
        });
      }
      throw 'Error creating user';
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  me(@Request() req: ExpressRequest): Partial<User> {
    return classToPlain(req.user as User);
  }
}
