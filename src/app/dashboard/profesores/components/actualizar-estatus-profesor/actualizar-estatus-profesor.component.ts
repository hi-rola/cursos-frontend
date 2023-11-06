import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from '../../interface/profesor.interface';

@Component({
  selector: 'app-actualizar-estatus-profesor',
  templateUrl: './actualizar-estatus-profesor.component.html',
  styleUrls: ['./actualizar-estatus-profesor.component.css'],
})
export class ActualizarEstatusProfesorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Profesor) {}
}
