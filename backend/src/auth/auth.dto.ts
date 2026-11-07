import { IsEmail, IsString, Length, Matches, MaxLength, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'userName may only contain letters, digits, _ and -' })
  userName!: string;

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }, {message : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'})
  @MaxLength(128)
  password!: string;
}

export class SignInDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @MaxLength(128)
  password!: string;
}