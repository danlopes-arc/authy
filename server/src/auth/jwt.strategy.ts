import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getEnv } from '../utils/env';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

export type JwtPayload = {
  sub: number;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getEnv().JWT_SECRET,
    });
  }

  async validate({ sub: id }: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
