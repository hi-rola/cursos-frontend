import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    MainPageComponent,
    Error404PageComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    Error404PageComponent,
    MainPageComponent,
    SidenavComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
