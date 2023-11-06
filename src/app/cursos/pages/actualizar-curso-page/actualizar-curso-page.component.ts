import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { Categoria, Curso, Profesor } from '../../interfaces/curso.interface';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-curso-page',
  templateUrl: './actualizar-curso-page.component.html',
  styleUrls: ['./actualizar-curso-page.component.css'],
})
export class ActualizarCursoPageComponent implements OnInit {
  tituloHeader: string = 'Actualizar información curso';

  categorias: Categoria[] = [];
  profesores: Profesor[] = [];
  id_curso!: number;

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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_curso = this.activatedRoute.snapshot.params['id_curso'];
    this.getCursoById(this.id_curso);
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

  getCursoById(id_curso: number) {
    this.cursosService.getCursoById(id_curso).subscribe((response) => {
      this.form.reset(response);
    });
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

  updateCurso() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cursosService
      .updateCurso(this.id_curso, this.getCursoForm())
      .subscribe((response) => {
        switch (response) {
          case 'Información actualizada exitosamente':
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
