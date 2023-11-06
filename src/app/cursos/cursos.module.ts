import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CursosPageComponent } from './pages/cursos-page/cursos-page.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CardCursoComponent } from './components/card-curso/card-curso.component';
import { DetallesCursoPageComponent } from './pages/detalles-curso-page/detalles-curso-page.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { RegistrarCursoComponent } from './pages/registrar-curso/registrar-curso.component';
import { ActualizarCursoPageComponent } from './pages/actualizar-curso-page/actualizar-curso-page.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    CursosPageComponent,
    CardCursoComponent,
    DetallesCursoPageComponent,
    CardHeaderComponent,
    RegistrarCursoComponent,
    ActualizarCursoPageComponent,
    ComentariosComponent,
  ],
  imports: [CommonModule, CursosRoutingModule, SharedModule, MaterialModule],
})
export class CursosModule {}
