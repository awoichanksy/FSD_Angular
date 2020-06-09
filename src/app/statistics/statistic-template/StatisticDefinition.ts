export class StatisticDefinition {

  title: string;
  chartLabels: string[];
  chartData: number[];

  constructor(title: string, chartLabels: string[], chartData: number[]) {
    this.title = title;
    this.chartLabels = chartLabels;
    this.chartData = chartData;
  }
}
