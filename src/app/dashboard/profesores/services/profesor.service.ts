import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { Profesor } from '../interface/profesor.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private baseUrl = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.baseUrl}/profesores`);
  }

  updateInformacionUsuario(
    id_usuario: number,
    usuario: Profesor
  ): Observable<Profesor | string> {
    return this.http
      .put<Profesor>(
        `${this.baseUrl}/usuarios-estudiante/` + id_usuario,
        usuario
      )
      .pipe(map((response) => response.mensaje!));
  }

  updateEstatusUsuario(id_usuario: number, estado: number): Observable<string> {
    const body = { estado };
    return this.http
      .patch<Profesor>(
        `${this.baseUrl}/usuarios-estudiante/` + id_usuario,
        body
      )
      .pipe(map((response) => response.mensaje!));
  }

  registrar(usuario: Profesor): Observable<Profesor | string> {
    return this.http
      .post<Profesor>(`${this.baseUrl}/usuarios-estudiante`, usuario)
      .pipe(map((response) => response.mensaje!));
  }
}
