export enum MENSAGEM_SISTEMA {
  ENTIDADE_NAO_ENCONTRADA = 'ENTIDADE_NAO_ENCONTRADA',
  ENTIDADE_CADASTRADA = 'ENTIDADE_CADASTRADA',
  ENTIDADE_ALTERADA = 'ENTIDADE_ALTERADA',
  ENTIDADE_EXCLUIDA = 'ENTIDADE_EXCLUIDA',
  ENTIDADE_LOCALIZADA = 'ENTIDADE_LOCALIZADA',

  EMAIL_CADASTRADO = 'EMAIL_CADASTRADO',
}

type MensagemValor = string | ((...args: any[]) => string);

type MensagemGenericas = {
  [key in MENSAGEM_SISTEMA]: MensagemValor;
};

const MENSAGEM_GENERICA: MensagemGenericas = {
  [MENSAGEM_SISTEMA.ENTIDADE_NAO_ENCONTRADA]: (entidade: string) => `${entidade} não localizada no sistema.`,
  [MENSAGEM_SISTEMA.ENTIDADE_CADASTRADA]: (entidade: string) => `${entidade} foi cadastrada no sistema.`,
  [MENSAGEM_SISTEMA.ENTIDADE_ALTERADA]: (entidade: string) => `${entidade} foi alterada no sistema.`,
  [MENSAGEM_SISTEMA.ENTIDADE_EXCLUIDA]: (entidade: string) => `${entidade} foi excluida no sistema.`,
  [MENSAGEM_SISTEMA.ENTIDADE_LOCALIZADA]: (entidade: string) => `${entidade} foi localizada no sistema.`,
  [MENSAGEM_SISTEMA.EMAIL_CADASTRADO]: (entidade: string) =>
    `O endereço de e-mail para ${entidade} já existe no sistema.`,
};

export function gerarMensagem(chave: MENSAGEM_SISTEMA, ...params: any[]): string {
  const mensagem = MENSAGEM_GENERICA[chave];
  if (typeof mensagem == 'function') {
    return mensagem(...params);
  }
  return mensagem;
}
