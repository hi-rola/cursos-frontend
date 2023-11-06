import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

export interface totalUsuarios {
  usuarios: number;
  profesores: number;
}

export interface generoUsuarios {
  femenino: number;
  masculino: number;
}

export interface categoriasCursos {
  web: number;
  movil: number;
  testing: number;
  programacion: number;
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  dataLabels: ApexDataLabels;
  colors: string[];
  legend: ApexLegend;
};
