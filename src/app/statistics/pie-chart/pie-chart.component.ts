import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() title: string;
  @Input() chartLabels: string[];
  @Input() chartData: any  [];
  chartType = 'pie';

  constructor() {
  }

  ngOnInit() {
  }

}
