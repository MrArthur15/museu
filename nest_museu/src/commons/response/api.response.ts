export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  mensagem?: string | null;
  erro?: string | null;
  path?: string | null;
  dados?: T | T[] | null;
}
