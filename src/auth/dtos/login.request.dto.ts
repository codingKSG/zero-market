import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class LoginRequestDto extends PickType(User, [
  'userId',
  'password',
] as const) {}
