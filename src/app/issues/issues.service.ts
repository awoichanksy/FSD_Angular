import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Issue} from "./Issue";
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class IssuesService {
  issuesUrl = 'http://localhost:8080/issues';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('IssuesService');
  }

  /** GET heroes from the server */
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issuesUrl)
      .pipe(
        catchError(this.handleError('getIssues', []))
      );
  }


}
