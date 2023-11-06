import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../../interfaces/curso.interface';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'cursos-detalles-curso-page',
  templateUrl: './detalles-curso-page.component.html',
  styleUrls: ['./detalles-curso-page.component.css'],
})
export class DetallesCursoPageComponent implements OnInit {
  id_curso!: number;
  curso: Curso | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.id_curso = this.activatedRoute.snapshot.params['id_curso'];
    this.getCurso();
  }

  getCurso() {
    this.cursosService
      .getCursoById(this.id_curso)
      .subscribe((response) => (this.curso = response));
  }
}
