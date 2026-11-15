import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ChatMessageDto {
    @IsString()
    @IsNotEmpty({message: 'The message can not be empty'})
    @MaxLength(500, {message: 'Message too long'})
    content!: string;
}