import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtestadoPage } from './components/atestado-lista/atestado-lista.page';
import { AtestadoCadastroComponent } from './components/atestado-cadastro/atestado-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: AtestadoPage,
  },
  { 
    path: 'atestado', 
    component: AtestadoPage,
  },
  {
    path: 'cadastro',
    component: AtestadoCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: AtestadoCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtestadoPageRoutingModule {}
