
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'; 
import type { Response } from 'express'; //type veut dire qu'on importe seulement le type, pour TypeScript. Le paquet @types/express est déjà dans tes devDependencies.
import { RegisterDto } from './auth.dto.js';
import { LoginDto } from './auth.dto.js';                 
import { AuthService } from './auth.service.js'; 
import { Public } from './public.decorator.js';

@Controller('auth')                 
export class AuthController {  
  constructor(private readonly authService: AuthService) {}  

  @Post('register')                 
  @Public()
  register(@Body() body: RegisterDto) {     
    return this.authService.register(body); 
  }
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) { //on récupère l'objet réponse d'Express pour y poser le cookie. passthrough: true est important : sans lui, NestJS considère que tu gères toute la réponse, et ton return serait ignoré. La requête resterait alors sans réponse.
    const token = await this.authService.login(body);
    res.cookie('access_token', token, { //ajoute à la réponse un en-tête Set-Cookie. Le navigateur le stocke, puis le renvoie tout seul à chaque requête suivante.
      httpOnly: true, //le JavaScript de la page ne peut pas lire le cookie. C'est la protection contre le vol par XSS.
      secure: true, //le cookie ne voyage qu'en HTTPS.
      sameSite: 'lax', //le cookie n'est pas envoyé par les requêtes POST venues d'autres sites. C'est la protection contre le CSRF.
      maxAge: 60 * 60 * 1000, //en millisecondes. Ici, 1 heure, la même durée que le JWT. Sinon, le navigateur garderait un cookie contenant un jeton déjà expiré.
      path: '/', //le cookie est envoyé pour toutes les adresses du site.
    });
    return { message: 'Logged in' }; //le jeton ne figure plus dans le corps. Il n'existe que dans le cookie, inaccessible au JavaScript.
    }
}
