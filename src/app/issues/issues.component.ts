import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from './Issue';
import {IssuesService} from './issues.service';
import {UnifiedTableComponent} from '../unified-table/unified-table.component';
import {ColumnDefinition} from '../unified-table/ColumnDefenition';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import * as Collections from 'typescript-collections';
import {DataObjectClass} from '../dataobject/DataObjectClass';
import {Solver} from '../solvers/Solver';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  providers: [IssuesService, UnifiedTableComponent],
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit, OnDestroy {

  columns = [
    new ColumnDefinition('name', 'Name', (issue: Issue) => issue.name),
    new ColumnDefinition('description', 'Description', (issue: Issue) => issue.description),
    new ColumnDefinition('solutionDescription', 'SolutionDescription', (issue: Issue) => issue.solutionDescription),
    new ColumnDefinition('updateTimestamp', 'LastUpdated', (issue: Issue) => issue.updateTimestamp)
  ];


  private dataSource: Collections.Set<DataObjectClass>;
  private newOrUpdatedIssues: Collections.Set<DataObjectClass>;
  private interval: number;
  private lastPollTime: Date = new Date();
  private alive: boolean; // used to unsubscribe from the TimerObservable  when OnDestroy is called.
  private optionSizes: number[] = [30, 5, 10, 15];
  private deletedItems: Collections.Set<Solver>;


  constructor(private issuesService: IssuesService) {
    this.alive = true;
    this.interval = 2000;
    if (this.alive) {
      this.createPollTimer();
    }
  }

  ngOnInit() {
    this.getIssues();
  }


  private createPollTimer() {
    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.issuesService.getIssuesAfterUpdateTime(this.lastPollTime)
          .subscribe((issueArray) => {
            this.lastPollTime = new Date();
            this.newOrUpdatedIssues = new Collections.Set<DataObjectClass>();
            this.putDataIntoCollection(issueArray, this.newOrUpdatedIssues);
          });
      });
  }

  getIssues(): void {
    this.issuesService.getIssues()
      .subscribe(issueArray => this.assignDataToDataSource(issueArray));
  }

  private assignDataToDataSource(issueArray: Issue[]) {
    this.dataSource = new Collections.Set<DataObjectClass>();
    this.putDataIntoCollection(issueArray, this.dataSource);
  }

  getUpdatedIssues() {
    this.lastPollTime = new Date();
    this.issuesService.getIssuesAfterUpdateTime(this.lastPollTime)
      .subscribe(issueArray => {
        this.putDataIntoCollection(issueArray, this.newOrUpdatedIssues);
      });
  }

  private putDataIntoCollection(issueArray: Issue[], dataCollection: Collections.Set<DataObjectClass>) {
    if (issueArray != null && issueArray.length > 0) {
      issueArray.forEach(issue => {
        const issueWithType = Object.assign(new Issue(), issue);
        return dataCollection.add(issueWithType);
      });
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  toggleAutoUpdate() {
    this.alive = !this.alive;
    this.createPollTimer();
  }
}



