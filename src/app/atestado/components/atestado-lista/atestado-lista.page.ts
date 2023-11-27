import { Component, OnInit } from '@angular/core';
import { AtestadoInterface } from '../../types/atestado.interface';
import { AlertController, ToastController } from '@ionic/angular';
import { AtestadoService } from '../../services/atestado.service';

@Component({
  selector: 'app-atestado',
  templateUrl: 'atestado-lista.page.html',
  styleUrls: ['atestado-lista.page.scss']
})
export class AtestadoPage implements OnInit{
  atestados: AtestadoInterface[] = [];


  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private atestadoService: AtestadoService
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

  listar() {
    this.atestadoService.getAtestados().subscribe(
      (dados) => {
        this.atestados = dados;
        // Ordena os atestados pela data após receber os dados
        this.atestados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(atestado: AtestadoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o atestado ${atestado.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(atestado),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(atestado: AtestadoInterface) {
    if (atestado.id) {
      this.atestadoService.excluir(atestado.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o atestado ${atestado.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  formatarData(data: Date): string {
    const dataObj = new Date(data);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(dataObj);
    return dataFormatada;
  }
}
