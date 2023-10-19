import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Input() sideNavStatus: boolean = false;

  collapsed = false;
  list = [
    {
      number: '1',
      name: 'home',
      icon: 'fa-solid fa-house',
    },
    {
      number: '2',
      name: 'usuarios',
      icon: 'fa-solid fa-house',
    },
    {
      number: '3',
      name: 'cursos',
      icon: 'fa-solid fa-house',
    },
  ];

  constructor() {}

  cerrar() {
    this.collapsed = !this.collapsed;
  }

  toggle() {
    this.collapsed = false;
  }
}
