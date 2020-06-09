import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic-template',
  templateUrl: './statistic-template.component.html',
  styleUrls: ['./statistic-template.component.css']
})
export class StatisticTemplateComponent implements OnInit {

  @Input() chartType;
  @Input() title: string;
  @Input() chartLabels: string[];
  @Input() chartData: number[];
  @Input() chartDataSet: any[];
  @Input() colors: Array<any> = [];
  //   = [
  //   { // grey
  //     // backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     // pointBackgroundColor: 'rgba(148,159,177,1)',
  //     // pointBorderColor: '#fff',
  //     // pointHoverBackgroundColor: '#fff',
  //     // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];


  ngOnInit() {
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
