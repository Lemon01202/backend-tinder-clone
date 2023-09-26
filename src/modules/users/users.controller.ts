import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EditProfileDto, User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  PROFILE_EDITING_BAD_REQUEST,
  PROFILE_EDITING_SUCCESS,
  USER_SUMMARY,
} from '../../mok/users.mok';
import { PREFIXES } from '../../mok/prefixes.mok';

@Controller(PREFIXES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('location') location: string,
    @Query('distance') distance: number,
    @Query('gender') gender: string,
    @Query('ageStart') ageStart: number,
    @Query('ageEnd') ageEnd: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return await this.usersService.getFilteredUsers({
      location,
      distance,
      gender,
      ageStart,
      ageEnd,
      page,
      limit,
      search,
    });
  }

  @Put(':id/edit')
  @ApiOperation({ summary: USER_SUMMARY.EDIT })
  @ApiResponse({ status: HttpStatus.OK, description: PROFILE_EDITING_SUCCESS })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: PROFILE_EDITING_BAD_REQUEST })
  async editProfile(@Param('id') userId: number, @Body() data: EditProfileDto) {
    return this.usersService.editProfile(userId, data);
  }

  @Get('matches')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: USER_SUMMARY.MATCHES })
  async getMatches(@Req() req) {
    return this.usersService.getMatches(req.user.id);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }
}
