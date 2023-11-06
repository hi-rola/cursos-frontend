import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../interface/profesor.interface';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarProfesorComponent } from '../../components/registrar-profesor/registrar-profesor.component';
import { ActualizarInformacionProfesorComponent } from '../../components/actualizar-informacion-profesor/actualizar-informacion-profesor.component';
import { ActualizarEstatusProfesorComponent } from '../../components/actualizar-estatus-profesor/actualizar-estatus-profesor.component';

@Component({
  selector: 'app-profesores-page',
  templateUrl: './profesores-page.component.html',
  styleUrls: ['./profesores-page.component.css'],
})
export class ProfesoresPageComponent implements OnInit {
  profesores: Profesor[] = [];
  displayedColumns: string[] = [
    'id_usuario',
    'nombre',
    'apellidos',
    'genero',
    'estado',
    'acciones',
  ];

  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private profesorService: ProfesorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe((response) => {
      this.profesores = response;
      this.dataSource = new MatTableDataSource(this.profesores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogRegistrar() {
    const dialogRef = this.dialog.open(RegistrarProfesorComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getProfesores();
    });
  }

  openDialogActInf(usuario: Usuario) {
    const dialogRef = this.dialog.open(ActualizarInformacionProfesorComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getProfesores();
    });
  }

  openDialogActEstatus(usuario: Usuario) {
    const estado = this.cambiarEstadoUsuario(usuario.estado!);

    const dialogRef = this.dialog.open(ActualizarEstatusProfesorComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.actualizarEstatus(usuario.id_usuario!, estado!);
      } else {
        this.getProfesores();
      }
    });
  }

  actualizarEstatus(id_usuario: number, estado: number) {
    this.profesorService
      .updateEstatusUsuario(id_usuario, estado)
      .subscribe((response) => {
        this.getProfesores();
        switch (response) {
          case 'Estatus actualizado exitosamente':
            this.mostrarSnackBar(response, 'OK');
            break;
          case 'Algo salió mal, inténtelo más tarde':
            this.mostrarSnackBar(response, ':(');
            break;
        }
      });
  }

  filtroTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarEstadoUsuario(estado: number): number {
    return estado === 1 ? 0 : 1;
  }

  mostrarSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
