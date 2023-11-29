import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnDestroy {
  horaAtual!: Date;
  private timerSubscription: Subscription;

  constructor() {
    // Atualiza a hora a cada segundo
    this.timerSubscription = interval(1000).subscribe(() => {
      this.atualizarHora();
    });
  }

  ngOnDestroy() {
    // Cancela a assinatura do timer ao sair da página para evitar vazamentos de memória
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private atualizarHora() {
    this.horaAtual = new Date();
  }
}