import {Component, OnInit} from '@angular/core';
import {Issue} from './Issue';
import {MatTableDataSource} from "@angular/material";
import {IssuesService} from './issues.service'
import {UnifiedTableComponent} from "../unified-table/unified-table.component";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  providers: [IssuesService, UnifiedTableComponent],
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit {
  // @formatter:off
  //TODO: extract interface, so that unified table can use it
  columns = [
    {columnDef: 'oid', header: 'oid', cell: (issue: Issue) => `${issue.oid}`},
    {columnDef: 'name', header: 'Name', cell: (issue: Issue) => `${issue.name}`},
    {columnDef: 'description', header: 'description', cell: (issue: Issue) => `${issue.description}`},
    {columnDef: 'solutionDescription', header: 'solutionDescription', cell: (issue: Issue) => `${issue.solutionDescription}` }
  ];
  // @formatter:on
  displayedColumns = this.columns.map(c => c.columnDef);
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



