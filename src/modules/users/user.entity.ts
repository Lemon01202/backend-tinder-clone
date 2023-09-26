import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @IsString()
  @IsOptional()
  googleId: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  bio: string;

  @Column
  avatar: string;

  @Column
  email: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  current_token?: string;

  @IsNumber()
  @IsOptional()
  distance?: number;

  @Column
  @IsString()
  @IsIn(['male', 'female'])
  @IsOptional()
  gender?: string;

  @Column
  @IsNumber()
  @IsOptional()
  age?: number;

  @IsNumber()
  @IsOptional()
  ageStart?: number;

  @IsNumber()
  @IsOptional()
  ageEnd?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class EditProfileDto {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @Column
  bio: string;

  @ApiProperty()
  avatar?: string[];

  @ApiProperty()
  bios?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty({
    description: 'Age can only be edited once',
  })
  age?: number;
}
