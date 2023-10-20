import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { enviroments } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios-estudiante`);
  }

  getUsuarioById(id_usuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.baseUrl}/usuarios-estudiante/` + id_usuario
    );
  }

  updateInformacionUsuario(
    id_usuario: number,
    usuario: Usuario
  ): Observable<Usuario | string> {
    return this.http
      .put<Usuario>(
        `${this.baseUrl}/usuarios-estudiante/` + id_usuario,
        usuario
      )
      .pipe(map((response) => response.mensaje!));
  }

  updateEstatusUsuario(id_usuario: number, estado: number): Observable<string> {
    const body = { estado };
    return this.http
      .patch<Usuario>(`${this.baseUrl}/usuarios-estudiante/` + id_usuario, body)
      .pipe(map((response) => response.mensaje!));
  }

  registrar(usuario: Usuario): Observable<Usuario | string> {
    return this.http
      .post<Usuario>(`${this.baseUrl}/auth/registrar`, usuario)
      .pipe(map((response) => response.mensaje!));
  }
}
