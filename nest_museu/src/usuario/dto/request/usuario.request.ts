import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioRequest {
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.nomeUsuario, example: 'Antonio da Silva' })
  nomeUsuario: string = '';
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.email, example: 'silva@gmail.com' })
  email: string = '';
  @IsString()
  @ApiProperty({ description: USUARIO.SWAGGER.senha, example: '87654321' })
  senha: string = '';
}
