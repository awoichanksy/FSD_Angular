import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {Device} from "./Device";


@Injectable()
export class DevicesService {
  devicesUrl = 'http://localhost:8080/devices';
  devicesAddUrl = this.devicesUrl + "/add";
  private readonly handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DevicesService');
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesUrl)
      .pipe(
        catchError(this.handleError('getDevices', []))
      );
  }


  addNewDevice(device: Device): Observable<Device[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const name = device.name;
    const description = device.description.toString();
    const location = device.location.toString();
    const url: string = this.devicesAddUrl + `?name=${name}&description=${description}&location=${location}`;
    return this.http.post<Device[]>(url, device, httpOptions)
      .pipe(
        catchError(this.handleError('getDevices', []))
      );
  }
}
