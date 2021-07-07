import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';

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
  ],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
