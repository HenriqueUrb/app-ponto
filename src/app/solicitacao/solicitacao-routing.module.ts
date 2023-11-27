import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoPage } from './components/solicitacao-lista/solicitacao-lista.page';
import { SolicitacaoCadastroComponent } from './components/solicitacao-cadastro/solicitacao-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoPage,
  },
  { 
    path: 'solicitacao', 
    component: SolicitacaoPage,
  },
  {
    path: 'cadastro',
    component: SolicitacaoCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: SolicitacaoCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoPageRoutingModule {}
