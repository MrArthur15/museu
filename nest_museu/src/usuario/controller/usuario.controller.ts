import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  ApiDeleteDoc,
  ApiGetDoc,
  ApiListDoc,
  ApiPostDoc,
  ApiPutDoc,
} from '../../commons/decorators/swagger.decorators';
import { ResponseBuilder } from '../../commons/response/builder.response';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioService } from '../service/usuario.service';

@ApiTags(USUARIO.ALIAS)
@Controller(USUARIO.ALIAS)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  @ApiListDoc(USUARIO.OPERACAO.LISTAR, UsuarioResponse)
  listar(@Req() req: Request) {
    const response = this.usuarioService.listar();
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_LISTAGEM)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Get(USUARIO.ROTA.ID)
  @ApiGetDoc(USUARIO.OPERACAO.PORID, UsuarioRequest, UsuarioResponse)
  porId(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.porId(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_LOCALIZADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Post()
  @ApiPostDoc(USUARIO.OPERACAO.SALVAR, UsuarioRequest, UsuarioResponse)
  salvar(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.salvar(usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_CADASTRADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Put(USUARIO.ROTA.ID)
  @ApiPutDoc(USUARIO.OPERACAO.ATUALIZAR, UsuarioRequest, UsuarioResponse)
  atualizar(@Param('id') id: number, @Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.atualizar(id, usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_ALTERADA)
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Delete(USUARIO.ROTA.ID)
  @ApiDeleteDoc(USUARIO.OPERACAO.DELETAR)
  deletar(@Param('id') id: number, @Req() req: Request) {
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem(USUARIO.MENSAGEM.ENTIDADE_EXCLUIDA)
      .path(req.path)
      .build();
  }
}
