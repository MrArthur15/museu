import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from '../../commons/exception/error/entitynotfound.exeception';
import { SaveException } from '../../commons/exception/error/save.exception';
import { Pageable } from '../../commons/pagination/pageable.response';
import { Page } from '../../commons/pagination/pagination.system';
import { fieldusuarios, USUARIO } from '../constants/usuario.constants';
import { UsuarioConverter } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {}
  async listar(
    page: number,
    pageSize: number,
    field: string,
    sort: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<UsuarioResponse>> {
    const pageable = new Pageable(page, pageSize, field, sort, fieldusuarios);

    const query = this.usuarioRepository
      .createQueryBuilder('usuario')
      .orderBy(`${field}`, sort)
      .skip(pageable.offset)
      .take(pageable.limit);

    if (search) {
      query.where(`${field} LIKE: :search_pesquisa`, { search_pesquisa: `%${search}` });
    }

    const [usuarios, totalElements] = await query.getManyAndCount();
    const listaUsuario = UsuarioConverter.toListarUsuarioResponse(usuarios);

    return Page.of(listaUsuario, totalElements, pageable);
  }

  async porId(id: number): Promise<UsuarioResponse | null> {
    const usuario = await this.buscarPorId(id);
    if (usuario === null) {
      throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }

    return UsuarioConverter.toUsuarioResponde(usuario);
  }
  async salvar(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse | null> {
    const novoUsuario = UsuarioConverter.toUsuario(usuarioRequest);

    try {
      novoUsuario.senha = await bcrypt.hash(usuarioRequest.senha, 10);
      const usuarioCadastrado = await this.usuarioRepository.save(novoUsuario);
      return UsuarioConverter.toUsuarioResponde(usuarioCadastrado);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro no cadastro do usuario ${error.message}`);
    }
  }
  async atualizar(id: number, usuarioRequest: UsuarioRequest): Promise<UsuarioResponse | null> {
    const usuarioCadastado = await this.buscarPorId(id);
    if (usuarioCadastado === null) {
      throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }
    try {
      const dadosNovos = UsuarioConverter.toUsuario(usuarioRequest);
      dadosNovos.idUsuario = id;
      const usuarioParaSalvar = Object.assign(usuarioCadastado, dadosNovos);
      const usuarioAtualizado = await this.usuarioRepository.save(usuarioParaSalvar);
      if (usuarioAtualizado === null) {
        throw new SaveException('Usuario não cadastrado');
      }
      return UsuarioConverter.toUsuarioResponde(usuarioAtualizado);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro na atualização do usauario, ${error.message}`);
    }
  }
  async apagar(id: number): Promise<void> {
    const usuario = await this.buscarPorId(id);
    if (usuario === null) {
      throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
    }
    try {
      await this.usuarioRepository.remove(usuario);
    } catch (error: any) {
      throw new InternalServerErrorException(`Erro no exclusão do usuario ${error.message}`);
    }
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    try {
      const usuario = await this.usuarioRepository
        .createQueryBuilder(USUARIO.ENTITY)
        .where(`usuario.id_Usuario = :id`, { id })
        .getOne();
      if (usuario === null) {
        throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
      }

      return usuario;
    } catch (error: any) {
      throw new EntityNotFoundException(USUARIO.MENSAGEM.ENTIDADE_NAO_ENCONTRADA);
      throw new InternalServerErrorException(`Erro no sistema, ${error.message}`);
    }
  }
}
