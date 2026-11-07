
import { Body, Controller, Post } from '@nestjs/common';  
import { RegisterDto } from './auth.dto.js';               
import { AuthService } from './auth.service.js'; 

@Controller('auth')                 
export class AuthController {  
  constructor(private readonly authService: AuthService) {}  

  @Post('register')                 
  register(@Body() body: RegisterDto) {     
    return this.authService.register(body); 
  }
}

