import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import {
  EstatusUsuarioSlideTogglePipe,
  EstatusUsuarioTablePipe,
} from './pipes/estatus-usuario.pipe';
import { ActualizarInformacionComponent } from './components/actualizar-informacion/actualizar-informacion.component';
import { MensajeActualizarEstatusComponent } from './components/mensaje-actualizar-estatus/mensaje-actualizar-estatus.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    UsuariosPageComponent,
    EstatusUsuarioSlideTogglePipe,
    EstatusUsuarioTablePipe,
    ActualizarInformacionComponent,
    MensajeActualizarEstatusComponent,
    RegistrarComponent,
  ],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule, MaterialModule],
})
export class UsuariosModule {}
