import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ProfesoresPageComponent } from './profesores/pages/profesores-page/profesores-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
      },
      {
        path: 'profesores',
        component: ProfesoresPageComponent,
      },
      {
        path: '**',
        redirectTo: 'estadisticas',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
