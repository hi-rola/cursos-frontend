import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Profesor } from '../../interface/profesor.interface';

@Component({
  selector: 'app-actualizar-informacion-profesor',
  templateUrl: './actualizar-informacion-profesor.component.html',
  styleUrls: ['./actualizar-informacion-profesor.component.css'],
})
export class ActualizarInformacionProfesorComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    edad: ['', Validators.required],
    genero: ['', Validators.required],
    rol: [2],
    estado: [1],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuariosService
      .getUsuarioById(this.data.id_usuario!)
      .subscribe((response) => {
        this.form.reset(response);
      });
  }

  campoValido(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getCampoError(field: string) {
    return this.validatorsService.getFieldError(this.form, field);
  }

  getProfesorForm() {
    return this.form.value as Profesor;
  }

  actualiarInformacion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usuariosService
      .updateInformacionUsuario(this.data.id_usuario!, this.getProfesorForm())
      .subscribe((response) => {
        switch (response) {
          case 'Información actualizada exitosamente':
            this.mostrarSnackBar(response, 'OK');
            break;
          case 'Algo salió mal, inténtelo más tarde':
            this.mostrarSnackBar(response, ':(');
            break;
          default:
            break;
        }
      });
  }

  mostrarSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
