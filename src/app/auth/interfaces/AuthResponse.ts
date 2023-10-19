export interface AuthResponse {
  id_usuario?: number;
  nombre?: string;
  apellidos?: string;
  edad?: number;
  genero?: string;
  correo?: string;
  rol?: number;
  estado?: number;
  token?: string;
  ok?: boolean;
  mensaje?: string;
}

export interface Usuario extends AuthResponse {}
