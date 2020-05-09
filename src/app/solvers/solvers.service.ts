import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Solver} from './Solver';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';


@Injectable()
export class SolversService {
  solversUrl = 'http://localhost:8083/solvers';  // URL to web api
  solvers_add_url = 'http://localhost:8083/solver/add';  // URL to web api
  private readonly handleError: HandleError;

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

  addNewSolver(solver: Solver): Observable<Solver[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    const name = solver.name;
    const active = solver.active.toString();
    const url: string = this.solvers_add_url + `?name=${name}&active=${active}`;
    return this.http.post<Solver[]>(url, solver, httpOptions)
      .pipe(
        catchError(this.handleError('addNewSolver', []))
      );
  }

  deleteSolver(solver: Solver): Observable<Solver> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    const oid = solver.oid;
    const url: string = this.solvers_delete_url + `?oid=${oid}`;
    return this.http.delete<Solver>(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteSolver', solver))
      );
  }
}
