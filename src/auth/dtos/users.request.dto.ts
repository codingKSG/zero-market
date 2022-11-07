import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UsersRequestDto extends PickType(User, [
  'userId',
  'password',
  'nickname',
  'name',
  'phone',
] as const) {}
