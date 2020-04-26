import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Issue} from './Issue';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';


@Injectable()
export class IssuesService {
  issuesUrl = 'http://localhost:8080/issues';
  issuesUrlAfterUpdateTime = 'http://localhost:8080/issues/updatetime?updatetime=';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('IssuesService');
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
