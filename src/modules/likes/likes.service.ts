import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from '../../models/like.model';
import { User } from '../users/user.entity';
import { ERROR_MESSAGES } from '../../mok/likes.mok';

@Injectable()
export class LikesService {
  async likeUser(likerId: number, likedUserId: number): Promise<Like> {
    const existingLike = await Like.findOne({
      where: { likerId, likedUserId },
    });
    if (existingLike) {
      throw new NotFoundException(ERROR_MESSAGES.ALREADY_LIKED);
    }

    const like = new Like();
    like.likerId = likerId;
    like.likedUserId = likedUserId;

    return like.save();
  }

  async checkLike(likerId: number, likedUserId: number): Promise<boolean> {
    const like = await Like.findOne({ where: { likerId, likedUserId } });
    return !!like;
  }

  async getMatches(userId: number): Promise<User[]> {
    const likesYouGave = await Like.findAll({ where: { likerId: userId } });
    const usersYouLikedIds = likesYouGave.map((like) => like.likedUserId);

    const likesYouReceived = await Like.findAll({
      where: { likedUserId: userId, likerId: usersYouLikedIds },
    });

    const matchedUserIds = likesYouReceived.map((like) => like.likerId);

    return User.findAll({ where: { id: matchedUserIds } });
  }

  async removeLike(likerId: number, likedUserId: number): Promise<void> {
    const existingLike = await Like.findOne({
      where: { likerId, likedUserId },
    });
    if (existingLike) {
      await existingLike.destroy();
    } else {
      throw new NotFoundException(ERROR_MESSAGES.NO_LIKE_TO_REMOVE);
    }
  }
}
