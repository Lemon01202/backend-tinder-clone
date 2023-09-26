import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { Like } from '../../models/like.model';
import { JwtStrategy } from '../../strategies/jwt.stategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, SequelizeModule.forFeature([Like])],
  providers: [LikesService, JwtStrategy],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
