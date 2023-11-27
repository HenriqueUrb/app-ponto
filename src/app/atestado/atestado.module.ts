import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtestadoPage } from './components/atestado-lista/atestado-lista.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AtestadoPageRoutingModule } from './atestado-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AtestadoService } from './services/atestado.service';
import { AtestadoCadastroComponent } from './components/atestado-cadastro/atestado-cadastro.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AtestadoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AtestadoService],
  declarations: [AtestadoPage, AtestadoCadastroComponent]
})
export class AtestadoPageModule {}
