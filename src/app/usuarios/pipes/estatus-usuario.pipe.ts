import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusUsuarioSlide',
})
export class EstatusUsuarioSlideTogglePipe implements PipeTransform {
  transform(estado: number): boolean {
    return estado === 1 ? true : false;
  }
}

@Pipe({
  name: 'estatusUsuarioTable',
})
export class EstatusUsuarioTablePipe implements PipeTransform {
  transform(estado: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }
}
