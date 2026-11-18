import { 
    IsString, 
    IsNotEmpty, 
    MaxLength,
    Length,
    Matches, 
    IsOptional,
    IsEmail,
    IsInt,
    Min,
    Max
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 20, { 
        message: 'Username must contain between 3 and 20 characters.'
    })
    @Matches(/^[a-zA-Z0-9_-]+$/, {
        message: 'userName may only contain letters, digits, _ and -',
    })
    userName?: string;

    @IsOptional()
    @IsString()
    @Length(0, 200, { 
        message: 'Bio must not exceed 200 characters.'
    })
    bio?: string;
        
}

export class SearchUserQueryDto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit: number = 10;
}

// Sortie
export class PublicUserDto {
    id:             number;
    userName:       string;
    bio:            string | null;
    createdAt:      Date;
    avatarUrl:      string | null;
    totalScore:     number;
    gamesPlayed:    number;
}

export class PrivateUserDto extends PublicUserDto {
    @IsEmail()
    @MaxLength(254)
    email: string;
}

export class PaginateUsersDto {
    data: PublicUserDto[];
    meta: {
        total: number;
        page:  number;
        limit: number;
        totalPages: number;
    };
}

