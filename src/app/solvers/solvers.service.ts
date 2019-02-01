import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Solver} from "./Solver";
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class SolversService {
  solversUrl = 'http://localhost:8080/solvers';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SolversService');
  }

  getSolvers(): Observable<Solver[]> {
    return this.http.get<Solver[]>(this.solversUrl)
      .pipe(
        catchError(this.handleError('getSolvers', []))
      );
  }


}
