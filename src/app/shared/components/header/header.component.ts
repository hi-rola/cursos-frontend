import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  cerrar() {
    this.menuStatus = !this.menuStatus;
    this.toggle.emit(this.menuStatus);
  }
}
