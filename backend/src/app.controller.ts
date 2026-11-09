// a basic controller with a single route

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Public } from './auth/public.decorator.js';
// import { IsEmail, IsNotEmpty } from 'class-validator';

// export class CreateUserDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  @Public()
  getPing(): string {
    return this.appService.getPing();
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto){
  //   return 'This action adds a new user';
  // }
}
