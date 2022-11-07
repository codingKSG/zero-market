import { IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const option: SchemaOptions = { timestamps: true };

@Schema(option)
export class User extends Document {
  @ApiProperty({ example: 'testid1', description: 'userId', required: true })
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'testpassword1',
    description: 'password',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: '테스터1',
    description: 'nickname',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '테스터',
    description: 'name',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '01012345678',
    description: 'phone',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Prop({
    default: 'url',
  })
  @IsString()
  profileImgUrl: string;

  @Prop()
  @IsString()
  introduce: string;

  readonly readOnlyData: {
    id: Types.ObjectId;
    userId: string;
    nickname: string;
    name: string;
    phone: string;
    profileImgUrl: string;
    introduce: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    userId: this.userId,
    nickname: this.nickname,
    name: this.name,
    phone: this.phone,
    profileImgUrl: this.profileImgUrl,
    introduce: this.introduce,
  };
});
