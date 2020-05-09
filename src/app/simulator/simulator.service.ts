import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';


@Injectable()
export class SimulatorService {
  SIMULATOR_URL = 'http://localhost:8083';
  SIMULATOR_MAPPING = '/simulator';
  DEVICE_MAPPING = '/device';
  SOLVER_MAPPING = '/solver';
  START_MAPPING = '/start';
  STOP_MAPPING = '/stop';
  STATE_MAPPING = '/state';
  DEVICE_SIMULATOR_START = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.DEVICE_MAPPING + this.START_MAPPING;
  DEVICE_SIMULATOR_STOP = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.DEVICE_MAPPING + this.STOP_MAPPING;
  DEVICE_SIMULATOR_STATE = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.DEVICE_MAPPING + this.STATE_MAPPING;
  SOLVER_SIMULATOR_START = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.SOLVER_MAPPING + this.START_MAPPING;
  SOLVER_SIMULATOR_STOP = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.SOLVER_MAPPING + this.STOP_MAPPING;
  SOLVER_SIMULATOR_STATE = this.SIMULATOR_URL + this.SIMULATOR_MAPPING + this.SOLVER_MAPPING + this.STATE_MAPPING;
  private readonly handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SimulatorService');
  }

  startSolverSimulator(): Observable<boolean> {
    return this.http.get(this.SOLVER_SIMULATOR_START)
      .pipe(
        catchError(this.handleError('startSolverSimulator', null))
      );
  }

  stopSolverSimulator(): Observable<boolean> {
    return this.http.get(this.SOLVER_SIMULATOR_STOP)
      .pipe(
        catchError(this.handleError('startSolverSimulator', null))
      );
  }


  isSolverSimulatorActive(): Promise<any> {
    return this.http.get(this.SOLVER_SIMULATOR_STATE).toPromise();
  }

  startDeviceSimulator(): Observable<boolean> {
    return this.http.get(this.DEVICE_SIMULATOR_START)
      .pipe(
        catchError(this.handleError('startSolverSimulator', null))
      );
  }

  stopDeviceSimulator(): Observable<boolean> {
    return this.http.get(this.DEVICE_SIMULATOR_STOP)
      .pipe(
        catchError(this.handleError('startSolverSimulator', null))
      );
  }


  isDeviceSimulatorActive(): Promise<any> {
    return this.http.get(this.DEVICE_SIMULATOR_STATE).toPromise();
  }
}
