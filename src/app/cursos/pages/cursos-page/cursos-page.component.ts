import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../interfaces/curso.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cursos-cursos-page',
  templateUrl: './cursos-page.component.html',
  styleUrls: ['./cursos-page.component.css'],
})
export class CursosPageComponent implements OnInit {
  cursos: Curso[] = [];

  dataSource!: MatTableDataSource<Curso>;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe((response) => {
      this.cursos = response;
      this.dataSource = new MatTableDataSource(this.cursos);
    });
  }

  filtrarCurso(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
