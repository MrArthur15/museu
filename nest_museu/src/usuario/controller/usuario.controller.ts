import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseBuilder } from '../../commons/response/builder.response';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  listar(@Req() req: Request) {
    const response = this.usuarioService.listar();
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensage('Listagem de usuarios')
      .path(req.path)
      .dados(response)
      .build();
  }
  @Get(':id')
  porId(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.porId(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK)
      .mensage('Usuario localizado no sistema')
      .path(req.path)
      .dados(response)
      .build();
  }
  @Post()
  salvar() {
    return this.usuarioService.salvar();
  }
  @Put(':id')
  altualizar(@Param('id') id: number) {
    return this.usuarioService.atualizar(id);
  }
  @Delete(':id')
  deletar(@Param('id') id: number, @Req() req: Request) {
    const response = this.usuarioService.apagar(id);
    return ResponseBuilder.status<UsuarioResponse>(HttpStatus.OK).mensage(response).path(req.path).build();
  }
}
