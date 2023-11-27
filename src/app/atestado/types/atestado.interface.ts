
export interface AtestadoInterface {
  id?: number | null;
  nome: string;
  data: Date;
  duracao: number;
  local: string;
  arquivo: File;
}
