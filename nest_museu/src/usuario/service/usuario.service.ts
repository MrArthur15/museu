import { Injectable, NotFoundException } from '@nestjs/common';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioConverter } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { TABELA_USUARIO } from './tabela.usuario';

@Injectable()
export class UsuarioService {
  listar(): UsuarioResponse[] {
    return UsuarioConverter.toListarUsuarioResponse(TABELA_USUARIO);
  }
  porId(id: number): UsuarioResponse | null {
    const usuarioCadastrado = TABELA_USUARIO.find((usuario) => usuario.idUsuario === id);
    if (!usuarioCadastrado) {
      throw new NotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }
    if (usuarioCadastrado) {
      return UsuarioConverter.toUsuarioResponde(usuarioCadastrado);
    }
    return null;
  }
  salvar(usuarioRequest: UsuarioRequest): UsuarioResponse {
    const id = TABELA_USUARIO.length + 1;
    const usuario = UsuarioConverter.toUsuario(usuarioRequest);
    usuario.idUsuario = id;
    TABELA_USUARIO.push(usuario);
    return UsuarioConverter.toUsuarioResponde(usuario);
  }
  atualizar(id: number, usuarioRequest: UsuarioRequest) {
    const usuarioCadastrado = TABELA_USUARIO.find((usario) => usario.idUsuario === id);
    if (!usuarioCadastrado) {
      throw new NotFoundException(`Usuario com id ${id} não encontrado`);
    }
    const usuario = UsuarioConverter.toUsuario(usuarioRequest);
    usuario.idUsuario = id;
    Object.assign(usuarioCadastrado, usuario); //usuario.nomeUsuario = usuarioRequest.nomeUsuario;
    return UsuarioConverter.toUsuarioResponde(usuarioCadastrado);
  }
  apagar(id: number): string | null {
    const usuarioCadastrado = TABELA_USUARIO.findIndex((usuario) => usuario.idUsuario === id);
    if (!usuarioCadastrado) {
      throw new NotFoundException(`Usuario com id ${id} não encontrado`);
    }
    TABELA_USUARIO.splice(usuarioCadastrado, 1);
    if (usuarioCadastrado > -1) {
      return 'Usuario excluido com sucesso';
    }

    return null;
  }
}
