import {
  Model,
  Table,
  Column,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../modules/users/user.entity';

@Table({ tableName: 'likes' })
export class Like extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column
  likerId!: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column
  likedUserId!: number;

  @ApiProperty()
  @BelongsTo(() => User, 'likerId')
  liker!: User;

  @ApiProperty()
  @BelongsTo(() => User, 'likedUserId')
  likedUser!: User;

  @ApiProperty()
  @Column
  createdAt!: Date;

  @ApiProperty()
  @Column
  updatedAt!: Date;
}
