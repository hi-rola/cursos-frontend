import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { ComentarioByUsuario } from '../../interfaces/curso.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'cursos-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios: ComentarioByUsuario[] = [];
  panelOpenState = false;
  ocultar = false;
  id_curso!: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form: FormGroup = this.fb.group({
    comentario: [''],
  });

  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id_curso = this.activatedRoute.snapshot.params['id_curso'];
    this.getComentarios(this.id_curso);
  }

  getComentarios(id_curso: number) {
    this.cursosService
      .getComentarios(id_curso)
      .subscribe((response) => (this.comentarios = response));
  }

  mostrarBtn() {
    if (this.form.untouched || this.form.touched) this.ocultar = true;
  }

  cancelar() {
    this.ocultar = false;
  }

  comentar() {
    const comentario = this.form.controls['comentario'].value;
    if (comentario !== '') {
      this.cursosService
        .publicarComentario(4, this.id_curso, comentario)
        .subscribe((response) => {
          console.log(response);
          switch (response) {
            case 'Mensaje publicado':
              this.mostrarSnackBar(response, ':)');
              this.getComentarios(this.id_curso);
              this.ocultar = false;
              this.form.reset();
              break;
            case 'Algo salió mal, inténtelo más tarde':
              this.mostrarSnackBar(response, ':(');
              break;
          }
        });
    }
  }

  mostrarSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
