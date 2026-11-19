import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { 
    UpdateProfileDto,
    SearchUserQueryDto,
    PublicUserDto,
    PrivateUserDto,
    PaginateUsersDto
} from './users.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserScalarFieldEnum } from '../generated/prisma/internal/prismaNamespace.js';
import { stringify } from 'node:querystring';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService
    ) {}
        private readonly publicSelect = {
            id:             true,
            userName:       true,
            bio:            true,
            createdAt:      true,
            avatarUrl:      true,
            totalScore:     true,
            gamesPlayed:    true,
        };
        private readonly privateSelect = {
            ...this.publicSelect,
            email: true,
        };

        async getMe(userId: number): Promise<PrivateUserDto> {
            const  user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: this.privateSelect,
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        }

        async updateMe(userId: number, dto: UpdateProfileDto): Promise<PrivateUserDto> {
            try {
                if (dto.userName) {
                    const existingUser = await this.prisma.user.findFirst({
                        where: { 
                            userName: { equals: dto.userName, mode: 'insensitive'},
                        },
                    });
                    if (existingUser && existingUser.id !== userId) {
                        throw new ConflictException('This username is already taken');
                    }
                }
                return await this.prisma.user.update({
                    where: { id: userId },
                    data: {
                        ...(dto.userName !== undefined && { userName: dto.userName }),
                        ...(dto.bio !== undefined && { bio: dto.bio }),
                    },
                    select: this.privateSelect,
                });
            } catch (e) {
                if (
                    e instanceof Prisma.PrismaClientKnownRequestError && 
                    e.code === 'P2002'
                ) {
                    throw new ConflictException('This username is already taken');
                }
                throw e;
            }
        }

        async searchUsers(query: SearchUserQueryDto): Promise<PaginateUsersDto> {
            const { search, page, limit } = query;
            const  skip = (page - 1) * limit;
            const whereCondition: Prisma.UserWhereInput = search
            ? {
                userName: {
                    contains: search,
                    mode: 'insensitive',
                },
            }: {};

            const [users, total] = await Promise.all([
                this.prisma.user.findMany({
                    where: whereCondition,
                    select: this.publicSelect,
                    skip,
                    take: limit,
                    orderBy: {userName: 'asc'},
                }),
                this.prisma.user.count({ where: whereCondition }),
            ]);

            return {
                data: users,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total /limit),
                },
            };
        }

        async getPublicProfile(userName: string): Promise<PublicUserDto> {
            const user = await this.prisma.user.findFirst({
                where: {
                    userName: {
                        equals: userName,
                        mode: 'insensitive',
                    },
                },
                select: this.publicSelect,
            });

            if (!user) {
                throw new NotFoundException(`User ${userName} not found`);
            }
            return user;
        }

}