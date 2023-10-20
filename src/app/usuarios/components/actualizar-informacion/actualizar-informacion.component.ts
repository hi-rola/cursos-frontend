import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UsuariosService } from '../../services/usuarios.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'usuarios-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css'],
})
export class ActualizarInformacionComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    edad: ['', Validators.required],
    genero: ['', Validators.required],
    rol: [1],
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

  getUsuarioForm() {
    return this.form.value as Usuario;
  }

  actualiarInformacion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usuariosService
      .updateInformacionUsuario(this.data.id_usuario!, this.getUsuarioForm())
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
