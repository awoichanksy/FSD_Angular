import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Device} from "./Device";
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';


@Injectable()
export class DevicesService {
  devicesUrl = 'http://localhost:8080/devices';
  private readonly handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DevicesService');
  }

  /** GET heroes from the server */
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesUrl)
      .pipe(
        catchError(this.handleError('getDevices', []))
      );
  }


}
