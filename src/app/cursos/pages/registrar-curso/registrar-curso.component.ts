import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { CursosService } from '../../services/cursos.service';
import { Categoria, Curso, Profesor } from '../../interfaces/curso.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-curso',
  templateUrl: './registrar-curso.component.html',
  styleUrls: ['./registrar-curso.component.css'],
})
export class RegistrarCursoComponent implements OnInit {
  tituloHeader = 'Registrar curso';
  categorias: Categoria[] = [];
  profesores: Profesor[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    imagen: ['', Validators.required],
    horas_demanda: ['', Validators.required],
    id_usuario: [, Validators.required],
    id_categoria: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getProfesores();
  }

  campoValido(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getCampoError(field: string) {
    return this.validatorsService.getFieldError(this.form, field);
  }

  getCursoForm() {
    return this.form.value as Curso;
  }

  mostrarImagenCurso() {
    if (this.form.get('imagen')?.value === '') {
      return 'assets/no-imagen.png';
    }
    return this.form.get('imagen')?.value;
  }

  getCategorias() {
    this.cursosService
      .getCategorias()
      .subscribe((response) => (this.categorias = response));
  }

  getProfesores() {
    this.cursosService
      .getProfesores()
      .subscribe((response) => (this.profesores = response));
  }

  registrarCurso() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cursosService
      .registrarCurso(this.getCursoForm())
      .subscribe((response) => {
        console.log(response);
        switch (response) {
          case 'Curso registrado exitosamente':
            this.mostrarSnackBar(response, 'OK');
            this.router.navigate(['/code-line/cursos']);
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
