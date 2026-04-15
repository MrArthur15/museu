import { ApiProperty } from '@nestjs/swagger';
import { TextField } from '../../../commons/decorators/text.decorators';
import { USUARIO } from '../../constants/usuario.constants';

export class UsuarioRequest {
  static entityName = USUARIO.ALIAS.toLocaleLowerCase();

  @TextField({ required: true, min: 5, max: 100, label: 'Nome', gender: 'm' })
  @ApiProperty({ description: USUARIO.SWAGGER.nomeUsuario, example: 'Antonio da Silva' })
  nomeUsuario!: string;
  @TextField({ required: true, min: 5, max: 100, label: 'E-Mail', gender: 'm' })
  @ApiProperty({ description: USUARIO.SWAGGER.email, example: 'silva@gmail.com' })
  email!: string;
  @TextField({ required: true, min: 5, max: 20, label: 'Senha', gender: 'f' })
  @ApiProperty({ description: USUARIO.SWAGGER.senha, example: '87654321' })
  senha!: string;

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
