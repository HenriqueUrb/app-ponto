import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SolicitacaoPageRoutingModule } from './solicitacao-routing.module';
import { SolicitacaoPage } from './components/solicitacao-lista/solicitacao-lista.page';
import { HttpClientModule } from '@angular/common/http';
import { SolicitacaoCadastroComponent } from './components/solicitacao-cadastro/solicitacao-cadastro.component';
import { SolicitacaoService } from './services/solicitacao.service';
import { MarcacaoService } from '../marcacao/services/marcacao.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SolicitacaoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [SolicitacaoService, MarcacaoService],
  declarations: [SolicitacaoPage, SolicitacaoCadastroComponent],
})
export class SolicitacaoPageModule {}
