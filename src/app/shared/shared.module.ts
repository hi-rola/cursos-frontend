import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {
  EstatusUsuarioSlideTogglePipe,
  EstatusUsuarioTablePipe,
} from './pipes/estatus-usuario.pipe';

@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    MainPageComponent,
    Error404PageComponent,
    EstatusUsuarioTablePipe,
    EstatusUsuarioSlideTogglePipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    Error404PageComponent,
    MainPageComponent,
    SidenavComponent,
    HeaderComponent,
    EstatusUsuarioTablePipe,
    EstatusUsuarioSlideTogglePipe,
  ],
})
export class SharedModule {}
