import { Component, OnInit } from '@angular/core';
import { MarcacaoInterface } from '../../types/marcacao.interface';
import { MarcacaoService } from '../../services/marcacao.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-marcacao',
  templateUrl: './marcacao-lista.page.html',
  styleUrls: ['marcacao-lista.page.scss'],
})
export class MarcacaoPage implements OnInit {
  marcacoes: MarcacaoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private marcacaoService: MarcacaoService
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
    this.marcacaoService.getMarcacoes().subscribe(
      (dados) => {
        this.marcacoes = dados;
        // Ordena as marcações pela data após receber os dados
        this.marcacoes.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(marcacao: MarcacaoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a marcação ${marcacao.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(marcacao),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(marcacao: MarcacaoInterface) {
    if (marcacao.id) {
      this.marcacaoService.excluir(marcacao.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o marcação ${marcacao.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  isDataAtual(dataMarcacao: Date): boolean {
    const hoje = new Date();
    const dataMarcacaoFormatada = new Date(dataMarcacao);

    // Comparar apenas dia, mês e ano
    return (
      hoje.getDate() === dataMarcacaoFormatada.getDate() &&
      hoje.getMonth() === dataMarcacaoFormatada.getMonth() &&
      hoje.getFullYear() === dataMarcacaoFormatada.getFullYear()
    );
  }
}
