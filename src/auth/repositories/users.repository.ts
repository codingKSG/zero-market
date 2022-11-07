import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRequestDto } from '../dtos/users.request.dto';
import { User } from '../users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  async findUserByUserId(userId: string): Promise<User | null> {
    try {
      return await this.usersModel.findOne({ userId });
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async existsByUserId(userId: string): Promise<any | null> {
    try {
      return await this.usersModel.exists({ userId });
    } catch (error) {
      throw new HttpException('db error...', 400);
    }
  }

  async create(data: UsersRequestDto): Promise<User> {
    try {
      return await this.usersModel.create(data);
    } catch (error) {
      throw new HttpException('db error...', 400);
    }
  }

  async findUserByNameAndPhone(data: {
    name: string;
    phone: string;
  }): Promise<User | null> {
    try {
      return await this.usersModel.findOne(data);
    } catch (error) {
      throw new HttpException('db error...', 400);
    }
  }

  async existsByUserIdAndNameAndPhone(data: {
    userId: string;
    name: string;
    phone: string;
  }): Promise<any | null> {
    try {
      return await this.usersModel.exists(data);
    } catch (error) {
      throw new HttpException('db error...', 400);
    }
  }
}
