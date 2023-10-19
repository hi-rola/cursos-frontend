import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/AuthResponse';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'auth-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css'],
})
export class RegistroPageComponent {
  hide = true;
  correoExistente = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form: FormGroup = this.fb.group({
    nombre: ['Isela', Validators.required],
    apellidos: ['Méndez Benitez', Validators.required],
    correo: [
      'ise@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasena: ['ise123', Validators.required],
    rol: [1],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  campoValido(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getCampoError(field: string) {
    return this.validatorsService.getFieldError(this.form, field);
  }

  getUsuarioForm() {
    return this.form.value as Usuario;
  }

  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.registrar(this.getUsuarioForm()).subscribe((response) => {
      switch (response) {
        case 'Correo existente, ingrese otro por favor':
          this.correoExistente = true;
          this.mostrarSnackBar(response, ':(');
          break;
        case 'Usuario registrado exitosamente':
          this.mostrarSnackBar('Cuenta registrada exitosamente', 'OK');
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
