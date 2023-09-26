import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PREFIXES } from '../../mok/prefixes.mok';
import { ERROR_MESSAGES, LIKES_SUMMARY } from '../../mok/likes.mok';

@ApiTags('Likes')
@Controller(PREFIXES.LIKES)
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: LIKES_SUMMARY.LIKE_USER })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ERROR_MESSAGES.SUCCESSFULLY_LIKED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGES.USER_NOT_FOUND_OR_ALREADY_LIKED,
  })
  async likeUser(@Req() req, @Param('id') likedUserId: number) {
    return this.likesService.likeUser(req.user.id, likedUserId);
  }

  @Get('matches')
  @ApiOperation({ summary: LIKES_SUMMARY.MATCHES })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ERROR_MESSAGES.SUCCESSFULLY_RETRIEVED_MATCHES,
  })
  async getMatches(@Req() req) {
    return this.likesService.getMatches(req.user.id);
  }

  @Post('unlike/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: LIKES_SUMMARY.UNLIKE_USER })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ERROR_MESSAGES.SUCCESSFULLY_REMOVED_LIKE,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERROR_MESSAGES.NO_LIKE_TO_REMOVE,
  })
  async removeLike(@Req() req, @Param('id') likedUserId: number) {
    return this.likesService.removeLike(req.user.id, likedUserId);
  }

  @Get('check/:id')
  @ApiOperation({ summary: LIKES_SUMMARY.CHECK_LIKES })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ERROR_MESSAGES.SUCCESSFULLY_CHECKED_LIKE,
  })
  async checkLike(@Req() req, @Param('id') likedUserId: number) {
    return this.likesService.checkLike(req.user.id, likedUserId);
  }
}
