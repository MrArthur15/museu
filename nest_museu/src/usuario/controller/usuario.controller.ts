import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseBuilder } from '../../commons/response/builder.response';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  listar(@Req() req: Request) {
    const response = this.usuarioService.listar();
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Listagem de usuarios')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Get(':id')
  porId(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.porId(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Usuario localizado no sistema')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Post()
  salvar(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.salvar(usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Usuario registrado com sucesso!')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Put(':id')
  atualizar(@Param('id') id: number, @Body() usuarioRequest: UsuarioRequest, @Req() req: Request) {
    const response = this.usuarioService.atualizar(id, usuarioRequest);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensagem('Usuario alterado com sucesso!')
      .path(req.path)
      .metodo(req.method)
      .dados(response)
      .build();
  }
  @Delete(':id')
  deletar(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.apagar(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK).mensagem(response).path(req.path).build();
  }
}
