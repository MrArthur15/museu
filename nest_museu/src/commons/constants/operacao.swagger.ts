export function criarSwaggerOperacao(ENTITY_NAME: string) {
  return {
    LISTAR: {
      ACAO: `Listagem dos cadastros de ${ENTITY_NAME} existentes`,
      SUCESSO: `A cnsulta dos cadastros de ${ENTITY_NAME} foi realizada com sucesso`,
      ERRO: `Falha na sonsulta dos cadastros de ${ENTITY_NAME} no sistema`,
    },
    PORID: {
      ACAO: `Exibir o cadastro de ${ENTITY_NAME} por um identificcador unico`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi localizado com sucesso`,
      ERRO: `Falha na localização do cadastro de ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O codigo informado no cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
    },
    SALVAR: {
      ACAO: `Criar um novo cadastro de ${ENTITY_NAME}`,
      SUCESSO: `A criação de ${ENTITY_NAME} foi criado com sucesso`,
      ERRO: `Falha na criação do cadastro de ${ENTITY_NAME} no sistema`,
      EXISTE: `${ENTITY_NAME} ja esta criada no sistena no sistema`,
    },
    ATUALIZAR: {
      ACAO: `Atualizar o cadastro de ${ENTITY_NAME} por um identificcador unico`,
      SUCESSO: `A atualizção do cadastro de ${ENTITY_NAME} foi realizada com sucesso`,
      ERRO: `Falha na atualização do cadastro de ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O codigo informado no cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
    },
    DELETAR: {
      ACAO: `Excluir o cadastro de ${ENTITY_NAME} por um identificcador unico`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi excluido com sucesso`,
      ERRO: `Falha na exclusão de ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O codigo informado no cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
    },
  };
}
