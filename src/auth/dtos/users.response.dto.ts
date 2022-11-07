import { ApiProperty, PickType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from '../users.schema';

export class UsersResponseDto extends PickType(User, [
  'userId',
  'nickname',
  'name',
  'phone',
] as const) {
  @ApiProperty({ example: '61316afe13', description: 'id' })
  id: Types.ObjectId;
}
