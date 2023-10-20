import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'usuarios-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasena: ['', Validators.required],
    edad: [, Validators.required],
    genero: ['', Validators.required],
    rol: [1],
  });

  correoExistente = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegistrarComponent>
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

  registrarUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.usuariosService
      .registrar(this.getUsuarioForm())
      .subscribe((response) => {
        switch (response) {
          case 'Correo existente, ingrese otro por favor':
            this.correoExistente = true;
            break;
          case 'Usuario registrado exitosamente':
            this.dialogRef.close({ data: true });
            this.mostrarSnackBar('Usuario registrado exitosamente', 'OK');
            break;
          case 'Algo salió mal, inténtelo más tarde':
            this.mostrarSnackBar(response, ':(');
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
