import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindConditions, Repository } from 'typeorm';

export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    console.log(this.usersRepository.create());
    return this.usersRepository.find();
  }

  async findOne(userData: FindConditions<User>): Promise<User | null> {
    return (
      (await this.usersRepository.findOne(undefined, { where: userData })) ??
      null
    );
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return !!result.affected;
  }

  async exists(userData: FindConditions<User>): Promise<boolean> {
    const checkUser = await this.findOne(userData);
    return !!checkUser;
  }
}
