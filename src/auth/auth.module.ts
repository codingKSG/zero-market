import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './services/auth.service';
import { User, UserSchema } from './users.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersRepository],
})
export class AuthModule {}
