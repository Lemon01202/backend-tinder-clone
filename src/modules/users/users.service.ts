import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';
import { Like } from '../../models/like.model';
import { AGE_EDIT_ONCE, USER_NOT_FOUND } from '../../mok/users.mok';

@Injectable()
export class UsersService {
  async getFilteredUsers(filters: any) {
    const queryConditions = {};

    if (filters.gender) {
      queryConditions['gender'] = filters.gender;
    }

    if (filters.ageStart && filters.ageEnd) {
      queryConditions['age'] = {
        [Op.between]: [filters.ageStart, filters.ageEnd],
      };
    }

    if (filters.search) {
      queryConditions[Op.or] = [
        {
          firstName: {
            [Op.like]: `%${filters.search}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${filters.search}%`,
          },
        },
      ];
    }

    const page = parseInt(filters.page, 10) || 0;
    const limit = parseInt(filters.limit, 10) || 10;

    const totalRecords = await User.count({ where: queryConditions });
    const totalPages = Math.ceil(totalRecords / limit);

    const users = await User.findAll({
      where: queryConditions,
      order: [['createdAt', 'DESC']],
      offset: page * limit,
      limit: limit,
    });

    return { items: users, totalPages: totalPages };
  }

  async editProfile(userId: number, data: any): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    if (user.age && data.age) {
      throw new BadRequestException(AGE_EDIT_ONCE);
    }

    return user.update(data);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return User.findOne({
      where: { googleId },
    });
  }

  async createUserFromGoogleProfile(profile: any): Promise<User> {
    const email = profile.emails[0].value;

    return User.create({
      googleId: profile.id,
      email: email,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    });
  }

  async create(data: any): Promise<User> {
    const user = new User();
    user.googleId = data.googleId;
    user.email = data.email;

    await user.save();
    return user;
  }

  async findById(userId: number): Promise<User> {
    return User.findByPk(userId);
  }

  async getMatches(userId: number): Promise<User[]> {
    const likes = await Like.findAll({
      where: {
        likerId: userId,
      },
      attributes: ['likedUserId'],
    });

    const matchedUserIds = likes.map((like) => like.likedUserId);

    const mutualLikeInstances = await Like.findAll({
      where: {
        likerId: {
          [Op.in]: matchedUserIds,
        },
        likedUserId: userId,
      },
      attributes: ['likerId'],
    });

    const mutualMatches = mutualLikeInstances.map((like) => like.likerId);

    if (mutualMatches.length === 0) return [];

    return User.findAll({
      where: {
        id: {
          [Op.in]: mutualMatches,
        },
      },
    });
  }
}
