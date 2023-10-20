import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/auth/interfaces/AuthResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarInformacionComponent } from '../../components/actualizar-informacion/actualizar-informacion.component';
import { MensajeActualizarEstatusComponent } from '../../components/mensaje-actualizar-estatus/mensaje-actualizar-estatus.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { RegistrarComponent } from '../../components/registrar/registrar.component';

@Component({
  selector: 'usuarios-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css'],
})
export class UsuariosPageComponent implements OnInit {
  usuarios: Usuario[] = [];
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
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsuariosEstudiantes();
  }

  getUsuariosEstudiantes() {
    this.usuariosService.getUsuarios().subscribe((response) => {
      this.usuarios = response;
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogRegistrar() {
    const dialogRef = this.dialog.open(RegistrarComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getUsuariosEstudiantes();
    });
  }

  openDialogActInf(usuario: Usuario) {
    const dialogRef = this.dialog.open(ActualizarInformacionComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getUsuariosEstudiantes();
    });
  }

  openDialogActEstatus(usuario: Usuario) {
    const estado = this.cambiarEstadoUsuario(usuario.estado!);

    const dialogRef = this.dialog.open(MensajeActualizarEstatusComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.actualizarEstatus(usuario.id_usuario!, estado!);
      } else {
        this.getUsuariosEstudiantes();
      }
    });
  }

  actualizarEstatus(id_usuario: number, estado: number) {
    this.usuariosService
      .updateEstatusUsuario(id_usuario, estado)
      .subscribe((response) => {
        this.getUsuariosEstudiantes();
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
