import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StatistikService {
  private solverStatisticUrl = environment.api_endpoint + 'statistics/solved';
  private deviceStatisticUrl = environment.api_endpoint + 'statistics/issuescreated';

  constructor(
    private http: HttpClient) {
  }

  getAmountIssuesSolvedByEachSovler(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.solverStatisticUrl);
  }

  getAmountIssuesCreatedByEachDevice(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.deviceStatisticUrl);
  }
}
