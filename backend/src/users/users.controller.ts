import {
  Body,
  Controller,
  Get,
  Req,
  Patch,
  UseGuards,
  Query,
  Param
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { 
    UpdateProfileDto,
    SearchUserQueryDto,
    PublicUserDto,
    PrivateUserDto,
    PaginateUsersDto
} from './users.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async getMe(@Req() req: any): Promise<PrivateUserDto> {
        const userId = req.user.sub;
        return this.usersService.getMe(userId);
    }

    @Patch('me')
    async updateMe(
        @Req() req: any,
        @Body() dto: UpdateProfileDto,
    ): Promise<PrivateUserDto> {
         const userId = req.user.sub;
        return this.usersService.updateMe(userId, dto);
    }

    @Get()
    async searchUsers(@Query() query: SearchUserQueryDto): Promise<PaginateUsersDto> {
        return this.usersService.searchUsers(query);
    }

    @Get(':username')
    async getPublicProfile(@Param('username') userName: string): Promise<PublicUserDto> {
        return this.usersService.getPublicProfile(userName);
    }

}