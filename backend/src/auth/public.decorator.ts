import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';//est exporté pour que le guard utilise exactement la même clé pour lire l'étiquette. Une faute de frappe dans une chaîne écrite deux fois rendrait l'étiquette invisible, en silence
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);//la fonction fournie par NestJS pour coller une étiquette sur une route ou un contrôleur. Ici : isPublic = true
//Public est une fonction qui renvoie un décorateur. C'est pour ça qu'on écrit @Public(), avec des parenthèses, comme @Post().
