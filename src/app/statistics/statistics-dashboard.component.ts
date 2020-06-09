import {Component, OnInit} from '@angular/core';
import {StatisticDefinition} from './statistic-template/StatisticDefinition';
import {SolverStatistic} from './SolverStatistic';
import {StatistikService} from './statistik.service';
import {DeviceStatistic} from './DeviceStatistic';

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  providers: [StatistikService],
  styleUrls: ['./statistics-dashboard.component.css']
})

export class StatisticsDashboardComponent implements OnInit {

  public statisticDefinitionSolver: StatisticDefinition = null;
  public statisticDefinitionDevice: StatisticDefinition = null;

  constructor(private statistikService: StatistikService) {
  }

  ngOnInit() {

    this.statistikService.getAmountIssuesSolvedByEachSovler().subscribe((res: Array<any>) => {
      const chartData = [];
      const chartLabels = [];

      res.forEach(obj => {
        const solverWithType = Object.assign(new SolverStatistic(), obj);
        chartLabels.push(solverWithType.solver.name);
        chartData.push(solverWithType.amountSolved);
      });
      this.statisticDefinitionSolver = new StatisticDefinition('How many issues did any Solver solve', chartLabels, chartData);
    });


    this.statistikService.getAmountIssuesCreatedByEachDevice().subscribe((res: Array<any>) => {
      const chartData = [];
      const chartLabels = [];

      res.forEach(obj => {
        const deviceWithType = Object.assign(new DeviceStatistic(), obj);
        chartLabels.push(deviceWithType.device.name);
        chartData.push(deviceWithType.amountCreated);
      });
      this.statisticDefinitionDevice = new StatisticDefinition('How many issues did any Device create', chartLabels, chartData);
    });


  }


}
