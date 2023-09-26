import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from "../../mok/auth.mok";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createJwtForUser(user: any): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error(ERROR_MESSAGES.JWT_SECRET_NOT_SET);
    }
    const expiresIn = '7d';
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  }

  async validateUser(profile: any): Promise<any> {
    let user = await this.usersService.findByGoogleId(profile.id);
    if (!user) {
      user = await this.usersService.create({
        googleId: profile.id,
        email: profile.emails[0].value,
      });
    }
    return user;
  }

  async validateUserById(userId: number) {
    return await this.usersService.findById(userId);
  }
}
