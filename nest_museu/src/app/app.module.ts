import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from '../database/database.module';
import { UsuarioModule } from '../usuario/usuario.module';

const modules = [UsuarioModule, DataBaseModule];

@Module({
  imports: [ConfigModule.forRoot(), ...modules],
})
export class AppModule {}
