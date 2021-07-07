import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  static make(userData: Partial<User>): User {
    const user = new User();
    user.username = userData.username ?? '';
    user.password = userData.password ?? '';
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: true })
  username: string = '';

  @Column()
  password: string = '';
}
