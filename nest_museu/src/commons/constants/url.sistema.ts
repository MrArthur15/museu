export type RotasRecursos = {
  BASE: string;
  ID: string;
};

export function gerarRotasRecurso(ENTITY_NAME: string): RotasRecursos {
  return {
    BASE: ENTITY_NAME,
    ID: ':id',
  };
}
