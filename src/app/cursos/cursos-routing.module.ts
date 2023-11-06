import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';
import { DetallesCursoPageComponent } from './pages/detalles-curso-page/detalles-curso-page.component';
import { RegistrarCursoComponent } from './pages/registrar-curso/registrar-curso.component';
import { ActualizarCursoPageComponent } from './pages/actualizar-curso-page/actualizar-curso-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'cursos',
        component: CursosPageComponent,
      },
      {
        path: 'cursos/:id_curso',
        component: DetallesCursoPageComponent,
      },
      {
        path: 'cursos-registrar',
        component: RegistrarCursoComponent,
      },
      {
        path: 'cursos-actualizar-informacion/:id_curso',
        component: ActualizarCursoPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
