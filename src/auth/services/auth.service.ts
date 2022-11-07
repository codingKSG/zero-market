import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { UsersRequestDto } from '../dtos/users.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtServie: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { userId, password } = data;

    //* userId가 존제하는지...
    const user = await this.usersRepository.findUserByUserId(userId);
    if (!user) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    //* password가 일치하는지...
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    //* JWT 생성하여 반환
    const payload = { userId: userId, sub: user._id };
    return {
      token: this.jwtServie.sign(payload),
    };
  }

  async userIdDoubleCheck(userId: string) {
    return (await this.usersRepository.existsByUserId(userId))
      ? { result: 2, message: '중복' }
      : { result: 1, message: '중복X' };
  }

  async signUp(data: UsersRequestDto) {
    const { userId, password, nickname, name, phone } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      userId,
      password: hashedPassword,
      nickname,
      name,
      phone,
    });

    return user.readOnlyData;
  }

  async userIdInquiry(data: { name: string; phone: string }) {
    const result = await this.usersRepository.findUserByNameAndPhone(data);
    return result ? result.userId : '존재하는 아이디가 없습니다.';
  }

  async passwordInquiry(data: { userId: string; name: string; phone: string }) {
    const result = await this.usersRepository.existsByUserIdAndNameAndPhone(
      data,
    );
    return result
      ? { result: 0, message: '정보맞음' }
      : { result: 1, message: '정보틀림' };
  }
}
