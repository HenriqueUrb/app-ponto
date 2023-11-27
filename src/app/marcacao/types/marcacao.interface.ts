import { TipoEnum } from './tipo.enum';

export interface MarcacaoInterface {
  id?: number | null;
  nome: string;
  data: Date;
  tipo: TipoEnum;
}
