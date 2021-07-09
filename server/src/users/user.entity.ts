import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ValidationError } from '../utils/exceptions';

@Entity()
export class User {
  static make(userData: Partial<User>): User {
    if (!userData.username) {
      throw new ValidationError<User>('username', 'Username is empty');
    }

    if (!userData.password) {
      throw new ValidationError<User>('password', 'Password is empty');
    }

    const user = new User();
    user.username = userData.username;
    user.password = userData.password;
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: true })
  username: string = '';

  @Exclude()
  @Column()
  password: string = '';
}
