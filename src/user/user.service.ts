import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findoneByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findoneById(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
