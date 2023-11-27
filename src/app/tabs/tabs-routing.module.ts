import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'marcacao',
        loadChildren: () => import('../marcacao/marcacao.module').then(m => m.MarcacaoPageModule)
      },
      {
        path: 'solicitacao',
        loadChildren: () => import('../solicitacao/solicitacao.module').then(m => m.SolicitacaoPageModule)
      },
      {
        path: 'atestado',
        loadChildren: () => import('../atestado/atestado.module').then(m => m.AtestadoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
})
export class TabsPageRoutingModule {}
