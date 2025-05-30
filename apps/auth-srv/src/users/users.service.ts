import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { Types } from 'mongoose';

interface Bcrypt {
  hash(data: string, saltOrRounds: string | number): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}

@Injectable()
export class UsersService {
  private readonly bcrypt: Bcrypt = bcrypt as Bcrypt;

  constructor(private readonly userRepository: UserRepository) {}

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({
        email: createUserDto.email,
      });
    } catch {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    const hashedPassword = await this.bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordIsValid = await this.bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    const query = {
      _id: new Types.ObjectId(getUserDto._id),
    };
    return await this.userRepository.findOne(query);
  }
}
