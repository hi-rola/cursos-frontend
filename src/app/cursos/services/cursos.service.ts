import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import {
  Categoria,
  Comentario,
  ComentarioByUsuario,
  Curso,
  Profesor,
} from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/cursos`);
  }

  getCursoById(id_curso: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/cursos/` + id_curso);
  }

  registrarCurso(curso: Curso): Observable<Curso | string> {
    return this.http
      .post<Curso>(`${this.baseUrl}/cursos`, curso)
      .pipe(map((response) => response.mensaje!));
  }

  updateCurso(id_curso: number, curso: Curso): Observable<Curso | string> {
    return this.http
      .put<Curso>(`${this.baseUrl}/cursos/` + id_curso, curso)
      .pipe(map((response) => response.mensaje!));
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.baseUrl}/profesores`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getComentarios(id_curso: number): Observable<ComentarioByUsuario[]> {
    return this.http.get<ComentarioByUsuario[]>(
      `${this.baseUrl}/comentarios/` + id_curso
    );
  }

  publicarComentario(
    id_usuario: number,
    id_curso: number,
    comentario: string
  ): Observable<Comentario | string> {
    const body = { id_usuario, id_curso, comentario };
    return this.http
      .post<Comentario>(`${this.baseUrl}/comentarios`, body)
      .pipe(map((response) => response.mensaje!));
  }
}
