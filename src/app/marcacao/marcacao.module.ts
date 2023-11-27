import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcacaoPage } from './components/marcacao-lista/marcacao-lista.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MarcacaoPageRoutingModule } from './marcacao-routing.module';
import { MarcacaoCadastroComponent } from './components/marcacao-cadastro/marcacao-cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { MarcacaoService } from './services/marcacao.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MarcacaoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [MarcacaoService],
  declarations: [MarcacaoPage, MarcacaoCadastroComponent],
})
export class MarcacaoPageModule {}
