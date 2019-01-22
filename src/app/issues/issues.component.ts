import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Issue} from './Issue';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {IssuesService} from './issues.service'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  providers: [IssuesService],
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['oid', 'name', 'description'];
  issues: Observable<Issue[]>;
  issuesAsArray: Issue[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private dataSource: MatTableDataSource<Issue>;

  constructor(private issuesService: IssuesService) {
    this.dataSource = new MatTableDataSource<Issue>(this.issuesAsArray);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.issuesService.getIssues()
      .subscribe(issueArray => {
        this.issuesAsArray = issueArray;
        this.dataSource = new MatTableDataSource<Issue>(this.issuesAsArray);
        this.dataSource.paginator = this.paginator;
      });
  }
}



