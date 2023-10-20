import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';

@Component({
  selector: 'usuarios-mensaje-actualizar-estatus',
  templateUrl: './mensaje-actualizar-estatus.component.html',
  styleUrls: ['./mensaje-actualizar-estatus.component.css'],
})
export class MensajeActualizarEstatusComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Usuario) {}
}
