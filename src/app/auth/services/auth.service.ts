import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import { AuthResponse, Usuario } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = enviroments.baseUrl;

  private usuario!: Usuario;

  get getCurrentUsuario(): Usuario | undefined {
    if (!this.usuario) return undefined;
    return structuredClone(this.usuario);
  }

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<AuthResponse | string> {
    const body = { correo, contrasena };
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, body)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token!);
        }),
        tap((response) => (this.usuario = response)),
        map((response) => response.mensaje!)
      );
  }

  registrar(usuario: Usuario): Observable<Usuario | string> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/registrar`, usuario)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token!);
        }),
        tap((response) => (this.usuario = response)),
        map((response) => response.mensaje!)
      );
  }
}
