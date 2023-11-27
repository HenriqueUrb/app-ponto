import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcacaoPage } from './components/marcacao-lista/marcacao-lista.page';
import { MarcacaoCadastroComponent } from './components/marcacao-cadastro/marcacao-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: MarcacaoPage,
  },
  { 
    path: 'marcacao', 
    component: MarcacaoPage,
  },
  {
    path: 'cadastro',
    component: MarcacaoCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: MarcacaoCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcacaoPageRoutingModule {}
