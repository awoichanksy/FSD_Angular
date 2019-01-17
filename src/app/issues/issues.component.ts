import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {map} from 'rxjs/operators';
import {Issue} from './Issue';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})


export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['oid', 'name', 'description'];

  issues: Observable<Issue[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.issues = this.http
      .get<Issue[]>('http://localhost:8080/issues')
      .pipe(map(data => _.values(data)));
  }

}



