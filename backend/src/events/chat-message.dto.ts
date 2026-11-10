import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ChatMessageDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    content: string;
}