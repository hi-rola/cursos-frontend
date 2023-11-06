import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroments';
import {
  categoriasCursos,
  generoUsuarios,
  totalUsuarios,
} from '../interfaces/totalUsuarios.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private baseUrl = enviroments.baseUrl;

  constructor(private http: HttpClient) {}

  getTotalUsuarios(): Observable<totalUsuarios> {
    return this.http.get<totalUsuarios>(
      `${this.baseUrl}/estadisticas-usuarios`
    );
  }

  getTotalCategorias(): Observable<categoriasCursos> {
    return this.http.get<categoriasCursos>(
      `${this.baseUrl}/estadisticas-categorias`
    );
  }

  getUsuariosGenero(): Observable<generoUsuarios> {
    return this.http.get<generoUsuarios>(`${this.baseUrl}/estadisticas-genero`);
  }
}
