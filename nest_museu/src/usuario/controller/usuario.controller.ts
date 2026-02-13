import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  listar() {
    return this.usuarioService.listar();
  }
  @Get(':id')
  porId(@Param('id') id: number) {
    return this.usuarioService.porId(id);
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
  deletar(@Param('id') id: number) {
    return this.usuarioService.apagar(id);
  }
}
