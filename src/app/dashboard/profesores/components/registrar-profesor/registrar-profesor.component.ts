import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { RegistrarComponent } from 'src/app/usuarios/components/registrar/registrar.component';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Profesor } from '../../interface/profesor.interface';

@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css'],
})
export class RegistrarProfesorComponent {
  form: FormGroup = this.fb.group({
    nombre: ['Andres', Validators.required],
    apellidos: ['Guzman', Validators.required],
    correo: [
      'guzman123@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasena: ['guzman123', Validators.required],
    edad: ['45', Validators.required],
    genero: ['M', Validators.required],
    rol: [2],
    estado: [1],
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

  getProfesorForm() {
    return this.form.value as Profesor;
  }

  registrarUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.usuariosService
      .registrar(this.getProfesorForm())
      .subscribe((response) => {
        switch (response) {
          case 'Correo existente, ingrese otro por favor':
            this.correoExistente = true;
            break;
          case 'Usuario registrado exitosamente':
            this.dialogRef.close({ data: true });
            this.mostrarSnackBar('Profesor registrado exitosamente', 'OK');
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
