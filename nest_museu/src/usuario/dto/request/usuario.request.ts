import { IsString } from 'class-validator';

export class UsuarioRequest {
  @IsString()
  nomeUsuario: string = '';
  @IsString()
  email: string = '';
  @IsString()
  senha: string = '';
}
