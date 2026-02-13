import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  listar() {
    return 'meu primeiro serviço no nest ';
  }
  porId(id: number) {
    return `o usuario com id ${id} foi localizado com sucesso`;
  }
  salvar() {
    return 'salvando o usuario no banco de dados';
  }
  atualizar(id: number) {
    return `alterando o registro do usuario com o id =  ${id}`;
  }
  apagar(id: number) {
    return `usuario excluido, id =  ${id}`;
  }
}
