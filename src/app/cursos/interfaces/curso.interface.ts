export interface Curso {
  id_curso?: number;
  nombre?: string;
  descripcion?: string;
  imagen?: string;
  horas_demanda?: string;
  id_usuario?: number;
  categoria?: string;
  nombre_profesor?: string;
  apellidos_profesor?: string;
  ok?: boolean;
  mensaje?: string;
}

export interface Categoria {
  id_categoria: number;
  categoria: string;
}

export interface ComentarioByUsuario {
  id_usuario_comentario_curso: number;
  id_usuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  comentario: string;
}

export interface Comentario {
  id_usuario_comentario_curso?: number;
  id_usuario?: number;
  id_curso?: number;
  comentario: string;
  ok?: boolean;
  mensaje?: string;
}

export interface Profesor {
  id_usuario: number;
  nombre: string;
  apellidos: string;
}
