import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
