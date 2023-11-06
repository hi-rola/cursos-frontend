import { Component, OnInit, ViewChild } from '@angular/core';

import { EstadisticasService } from '../../services/estadisticas.service';
import {
  ChartOptions,
  totalUsuarios,
} from '../../interfaces/totalUsuarios.interface';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'dashboard-total-usuarios',
  templateUrl: './total-usuarios.component.html',
  styleUrls: ['./total-usuarios.component.css'],
})
export class TotalUsuariosComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  usuarios: number[] = [];
  total!: number;

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.getDatosUsuarios();
  }

  getDatosUsuarios() {
    this.estadisticasService.getTotalUsuarios().subscribe((response) => {
      this.usuarios.push(response.profesores);
      this.usuarios.push(response.usuarios);
      this.total = this.sumaUsuarios(response);
      this.loadGrafica();
    });
  }

  sumaUsuarios(response: totalUsuarios): number {
    return response.profesores + response.usuarios;
  }

  loadGrafica() {
    this.chartOptions = {
      series: this.usuarios,
      chart: {
        type: 'pie',
      },
      labels: ['Profesores', 'Alumnos'],
      dataLabels: {
        enabled: false,
      },
      colors: ['#BB8FCE', '#FAD7A0'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
      },
    };
  }
}
