import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { UsersRequestDto } from '../dtos/users.request.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogin(body);
  }

  @ApiOperation({ summary: '아이디 중복확인' })
  @Get('check/:userId')
  userIdDoubleCheck(@Param('userId') userId: string) {
    return this.authService.userIdDoubleCheck(userId);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  singUp(@Body() body: UsersRequestDto) {
    return this.authService.signUp(body);
  }

  @ApiOperation({ summary: '아이디 찾기' })
  @Post('idInquiry')
  userIdInquiry(@Body() body: { name: string; phone: string }) {
    return this.authService.userIdInquiry(body);
  }

  @ApiOperation({ summary: '비밀번호 찾기' })
  @Post('pwInquiry')
  passwordInquiry(
    @Body() body: { userId: string; name: string; phone: string },
  ) {
    return this.authService.passwordInquiry(body);
  }
}
