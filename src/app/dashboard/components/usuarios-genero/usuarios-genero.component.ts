import { Component, OnInit, ViewChild } from '@angular/core';

import { EstadisticasService } from '../../services/estadisticas.service';
import { ChartOptions } from '../../interfaces/totalUsuarios.interface';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'dashboard-usuarios-genero',
  templateUrl: './usuarios-genero.component.html',
  styleUrls: ['./usuarios-genero.component.css'],
})
export class UsuariosGeneroComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  generos: number[] = [];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.getDatosUsuarios();
  }

  getDatosUsuarios() {
    this.estadisticasService.getUsuariosGenero().subscribe((response) => {
      this.generos.push(response.femenino);
      this.generos.push(response.masculino);
      this.loadGrafica();
    });
  }

  loadGrafica() {
    this.chartOptions = {
      series: this.generos,
      chart: {
        type: 'pie',
      },
      labels: ['Femenino', 'Masculino'],
      dataLabels: {
        enabled: false,
      },
      colors: ['#CA6F1E', '#2E86C1'],
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
