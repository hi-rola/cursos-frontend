import { Component, Input } from '@angular/core';
import { Curso } from '../../interfaces/curso.interface';

@Component({
  selector: 'cursos-card-curso',
  templateUrl: './card-curso.component.html',
  styleUrls: ['./card-curso.component.css'],
})
export class CardCursoComponent {
  @Input() curso!: Curso;
}
