import {Component, OnInit} from '@angular/core';
import {Issue} from './Issue';
import {MatTableDataSource} from "@angular/material";
import {IssuesService} from './issues.service'
import {UnifiedTableComponent} from "../unified-table/unified-table.component";
import {ColumnDefinition} from "../unified-table/ColumnDefenition";


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  providers: [IssuesService, UnifiedTableComponent],
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit {

  columns = [
    new ColumnDefinition("name", "Name", (issue: Issue) => issue.name),
    new ColumnDefinition("description", "Description", (issue: Issue) => issue.description),
    new ColumnDefinition("solutionDescription", "SolutionDescription", (issue: Issue) => issue.solutionDescription)
  ];

  private dataSource: MatTableDataSource<Issue>;
  optionSizes: number[] = [2, 5, 10, 15, 20];

  constructor(private issuesService: IssuesService) {
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(): void {
    this.issuesService.getIssues()
      .subscribe(issueArray => this.assignDataToDataSource(issueArray));
  }

  private assignDataToDataSource(issueArray) {
    this.dataSource = new MatTableDataSource<Issue>(issueArray);
  }
}



