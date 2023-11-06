import { Component, OnInit, ViewChild } from '@angular/core';

import { EstadisticasService } from '../../services/estadisticas.service';
import { ChartOptions } from '../../interfaces/totalUsuarios.interface';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'dashboard-categorias-cursos',
  templateUrl: './categorias-cursos.component.html',
  styleUrls: ['./categorias-cursos.component.css'],
})
export class CategoriasCursosComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  categorias: number[] = [];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.getDatosUsuarios();
  }

  getDatosUsuarios() {
    this.estadisticasService.getTotalCategorias().subscribe((response) => {
      this.categorias.push(response.web);
      this.categorias.push(response.movil);
      this.categorias.push(response.testing);
      this.categorias.push(response.programacion);
      this.loadGrafica();
    });
  }

  loadGrafica() {
    this.chartOptions = {
      series: this.categorias,
      chart: {
        type: 'pie',
      },
      labels: ['Web', 'Movil', 'Testing', 'Programacion'],
      dataLabels: {
        enabled: false,
      },
      colors: ['#BB8FCE', '#B7950B', '#CA6F1E', '#2E86C1'],
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
