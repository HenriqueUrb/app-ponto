import { MarcacaoInterface } from 'src/app/marcacao/types/marcacao.interface';
import { StatusEnum } from './status.enum';
import { TipoSolicitacaoEnum } from './tipo-solicitacao.enum';

export interface SolicitacaoInterface {
  id?: number | null;
  tipoSolicitacao: TipoSolicitacaoEnum;
  nome: string;
  data: Date;
  justificativa: string;
  status: StatusEnum;
  idMarcacao?: number;
}
