import {Component, OnInit} from '@angular/core';
import {ColumnDefinition} from "../unified-table/ColumnDefenition";
import {Issue} from "../issues/Issue";
import {UnifiedTableComponent} from "../unified-table/unified-table.component";
import {MatTableDataSource} from "@angular/material";
import {SolversService} from "./solvers.service";
import {Solver} from "./Solver";

@Component({
  selector: 'app-solvers',
  templateUrl: './solvers.component.html',
  providers: [SolversService, UnifiedTableComponent],
  styleUrls: ['./solvers.component.css']
})
export class SolversComponent implements OnInit {

  columns = [
    new ColumnDefinition("name", "Name", (issue: Issue) => issue.name),
  ];

  private dataSource: MatTableDataSource<Solver>;
  optionSizes: number[] = [2, 5, 10, 15, 20];

  constructor(private solversService: SolversService) {
  }

  ngOnInit() {
    this.getSolvers();
  }

  getSolvers(): void {
    this.solversService.getSolvers()
      .subscribe(solverArray => this.assignDataToDataSource(solverArray));
  }

  private assignDataToDataSource(solverArray) {
    this.dataSource = new MatTableDataSource<Solver>(solverArray);
  }

}
