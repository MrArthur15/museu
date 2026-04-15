import { ApiResponse } from './api.response';

export class ResponseBuilder<T> {
  private response: Partial<ApiResponse<T>> = {};

  static status<T>(status: number): ResponseBuilder<T> {
    const builder = new ResponseBuilder<T>();
    builder.response.status = status;
    builder.response.timestamp = new Date().toISOString();
    return builder;
  }
  mensagem(mensagem: string | null): this {
    this.response.mensagem = mensagem;
    return this;
  }
  erro(erro: string | null): this {
    this.response.erro = erro;
    return this;
  }
  path(path: string | null): this {
    this.response.path = path;
    return this;
  }
  metodo(metodo: string): this {
    this.response.metodo = metodo;
    return this;
  }
  dados(dados: T | T[] | null): this {
    this.response.dados = dados;
    return this;
  }

  build(): ApiResponse<T> {
    return this.response as ApiResponse<T>;
  }
}
