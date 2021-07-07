import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Controller()
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('auth')
  async login(@Body() user: User) {
    return await this.usersService.save(user);
  }

  @Post('register')
  async register(@Body() userData: User) {
    const userExists = await this.usersService.exists({
      username: userData.username,
    });

    if (userExists) {
      throw new BadRequestException();
    }

    const user = User.make(userData);
    return await this.usersService.save(user);
  }
}
