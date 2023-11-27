import { Component, OnInit } from '@angular/core';
import { SolicitacaoInterface } from '../../types/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { AlertController, ToastController } from '@ionic/angular';
import { StatusEnum } from '../../types/status.enum';
import { TipoSolicitacaoEnum } from '../../types/tipo-solicitacao.enum';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao-lista.page.html',
  styleUrls: ['solicitacao-lista.page.scss'],
})
export class SolicitacaoPage implements OnInit {
  solicitacoes: SolicitacaoInterface[] = [];
  tipoSolicitacaoEnum = TipoSolicitacaoEnum;  
  statusEnum = StatusEnum;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private solicitacaoService: SolicitacaoService
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

  formatarData(data: Date): string {
    const dataObj = new Date(data);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(dataObj);
    return dataFormatada;
  }
  

  listar() {
    this.solicitacaoService.getMarcacoes().subscribe(
      (dados) => {
        this.solicitacoes = dados;
        this.solicitacoes.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(solicitacao: SolicitacaoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a solicitação ${solicitacao.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(solicitacao),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(solicitacao: SolicitacaoInterface) {
    if (solicitacao.id) {
      this.solicitacaoService.excluir(solicitacao.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o marcação ${solicitacao.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  getStatusClass(status: StatusEnum): { [key: string]: boolean } {
    const classes = {
      'status-pendente': status === StatusEnum.PENDENTE,
      'status-aprovado': status === StatusEnum.APROVADO,
      'status-reprovado': status === StatusEnum.REPROVADO,
    };
    return classes;
  }

  statusEnumDescricao = {
    'P': 'PENDENTE',
    'A': 'APROVADO',
    'R': 'REPROVADO',
  };
  getStatusDescricao(status: StatusEnum): string {
    return this.statusEnumDescricao[status];
  }

  tipoSolicitacaoEnumDescricao = {
    'I': 'INCLUSÃO',
    'A': 'ALTERAÇÃO',
    'E': 'EXCLUSÃO',
  };
  getTipoSolicitacaoDescricao(tipoSolicitacao: TipoSolicitacaoEnum): string {
    return this.tipoSolicitacaoEnumDescricao[tipoSolicitacao];
  }
}
