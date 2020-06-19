import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from './Issue';
import {IssuesService} from './issues.service';
import {UnifiedTableComponent} from '../unified-table/unified-table.component';
import {ColumnDefinition} from '../unified-table/ColumnDefinition';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';
import * as Collections from 'typescript-collections';
import {DataObjectClass} from '../dataobject/DataObjectClass';
import {MatSlideToggleChange} from '@angular/material';
import {TranslationService} from '../translation.service';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  providers: [IssuesService, UnifiedTableComponent, TranslationService],
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit, OnDestroy {

  constructor(private issuesService: IssuesService, private translationService: TranslationService) {
    this.alive = true;
    this.interval = 2000;
    if (this.alive) {
      this.createPollTimer();
    }

  }

  columns = [
    new ColumnDefinition('name', 'Name', (issue: Issue) => issue.name),
    new ColumnDefinition('description', 'Description', (issue: Issue) => issue.description),
    new ColumnDefinition('state', 'State', (issue: Issue) => issue.issueState.name),
    new ColumnDefinition('solver', 'Solver', (issue: Issue) => IssuesComponent.solverNameOrEmptyString(issue)),
    new ColumnDefinition('device', 'Device', (issue: Issue) => IssuesComponent.deviceNameOrEmptyString(issue)),
    new ColumnDefinition('solutionDescription', 'Solution Description', (issue: Issue) => issue.solutionDescription),
    new ColumnDefinition('updateTimestamp', 'Last Updated', (issue: Issue) => issue.updateTimestamp)
  ];


  dataSource: Collections.Set<Issue>;
  newOrUpdatedIssues: Collections.Set<Issue>;
  interval: number;
  lastPollTime: Date = new Date();
  alive: boolean; // used to unsubscribe from the TimerObservable  when OnDestroy is called.
  optionSizes: number[] = [30, 5, 10, 15];
  deletedItems: Collections.Set<Issue>;
  issueDescription: String;


  private static deviceNameOrEmptyString(issue: Issue) {
    if (issue.device != null) {
      return issue.device.name;
    } else {
      return '';
    }
  }

  private static solverNameOrEmptyString(issue: Issue) {
    if (issue.solver != null) {
      return issue.solver.name;
    } else {
      return '';
    }
  }

  async ngOnInit() {
    this.getIssues();
    await this.translationService.loadTranslations();
    this.issueDescription = this.translationService.getTranslation('issues.description');
  }


  private createPollTimer() {
    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.issuesService.getIssuesAfterUpdateTime(this.lastPollTime)
          .subscribe((issueArray) => {
            this.lastPollTime = new Date();
            this.newOrUpdatedIssues = new Collections.Set<Issue>();
            this.putDataIntoCollection(issueArray, this.newOrUpdatedIssues);
          });
      });
  }

  getIssues(): void {
    this.issuesService.getIssues()
      .subscribe(issueArray => this.assignDataToDataSource(issueArray));
  }

  private assignDataToDataSource(issueArray: Issue[]) {
    this.dataSource = new Collections.Set<Issue>();
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

  toggleAutoUpdate($event: MatSlideToggleChange) {
    this.alive = $event.checked;
    this.createPollTimer();
  }
}



