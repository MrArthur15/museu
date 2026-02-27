import { Expose } from 'class-transformer';

export class UsuarioResponse {
  @Expose()
  idUsuario: number = 0;
  @Expose()
  nomeUsuario: string = '';
  @Expose()
  email: string = '';
  @Expose()
  ativo: boolean = true;
}
