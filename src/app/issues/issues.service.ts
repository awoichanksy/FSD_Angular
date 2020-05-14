import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Issue} from './Issue';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {environment} from '../../environments/environment';

@Injectable()
export class IssuesService {

  private readonly handleError: HandleError;
  issuesUrl;
  issuesUrlAfterUpdateTime;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('IssuesService');
    this.issuesUrl = environment.api_endpoint + 'issues';
    this.issuesUrlAfterUpdateTime = this.issuesUrl + '/updatetime?updatetime=';
  }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issuesUrl)
      .pipe(
        catchError(this.handleError('getIssues', []))
      );
  }


  getIssuesAfterUpdateTime(lastPollTime: Date): Observable<Issue[]> {
    const isoDate = new Date(lastPollTime.getTime() - (lastPollTime.getTimezoneOffset() * 60000)).toISOString();
    const issuesUrlWithTime = this.issuesUrlAfterUpdateTime + isoDate;
    return this.http.get<Issue[]>(issuesUrlWithTime)
      .pipe(
        catchError(this.handleError('getIssues', []))
      );
  }
}
