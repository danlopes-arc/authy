import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'authy',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
