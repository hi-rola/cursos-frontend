import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { TotalUsuariosComponent } from './components/total-usuarios/total-usuarios.component';
import { CategoriasCursosComponent } from './components/categorias-cursos/categorias-cursos.component';
import { UsuariosGeneroComponent } from './components/usuarios-genero/usuarios-genero.component';
import { ProfesoresPageComponent } from './profesores/pages/profesores-page/profesores-page.component';
import { RegistrarProfesorComponent } from './profesores/components/registrar-profesor/registrar-profesor.component';
import { ActualizarInformacionProfesorComponent } from './profesores/components/actualizar-informacion-profesor/actualizar-informacion-profesor.component';
import { ActualizarEstatusProfesorComponent } from './profesores/components/actualizar-estatus-profesor/actualizar-estatus-profesor.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    EstadisticasComponent,
    TotalUsuariosComponent,
    CategoriasCursosComponent,
    UsuariosGeneroComponent,
    ProfesoresPageComponent,
    RegistrarProfesorComponent,
    ActualizarInformacionProfesorComponent,
    ActualizarEstatusProfesorComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
