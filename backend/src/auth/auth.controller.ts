
import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common'; 
import type { Request, Response } from 'express'; //type veut dire qu'on importe seulement le type, pour TypeScript. Le paquet @types/express est déjà dans tes devDependencies.
import { RegisterDto, LoginDto } from './auth.dto.js';                 
import { AuthService } from './auth.service.js'; 
import { Public } from './public.decorator.js';
import type { JwtPayload } from './jwt-auth.guard.js';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';   

@Controller('auth')                 
export class AuthController {  
  constructor(private readonly authService: AuthService) {}  

  @Post('register')                 
  @Public()
  @UseGuards(ThrottlerGuard)
  register(@Body() body: RegisterDto) {     
    return this.authService.register(body); 
  }
  @Post('login')
  @HttpCode(200)
  @Public()
  @UseGuards(ThrottlerGuard)
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) { 
    const token = await this.authService.login(body);
    res.cookie('access_token', token, {
      httpOnly: true, 
      secure: true, 
      sameSite: 'lax', 
      maxAge: 60 * 60 * 1000, 
      path: '/', 
    });
    return { message: 'Logged in' }; 
    }
    @Get('me')
        me(@Req() req: Request & { user: JwtPayload }) {
    return this.authService.me(req.user.sub);
    }
    @Post('logout')
    @Public()
    @HttpCode(204)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
    }

}
