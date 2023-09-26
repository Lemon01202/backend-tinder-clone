import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/user.entity';
import { UploadModule } from './modules/upload/upload.module';
import { LikesModule } from "./modules/likes/likes.module";
import { Like } from "./models/like.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tinder_like',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Like],
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
