import { Injectable, Input } from '@angular/core';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { base_url } from '../shared/baseURL';
import { generateHeaders, getEndpoint } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Input()
  username: string;
  password: string;

  constructor(
    private processhttp: ProcessHttpmsgService,
    private http: HttpClient
    ) { }

  public getToken(token: string): Observable<any> {
    let endpoint = getEndpoint(`/api/auth/token`, token)
    return this.http.get(endpoint)
    //.pipe(catchError(this.processhttp.handleError))
  }

  public login(credentials: {account: number, username: string, password: string}): Observable<any> {
    // will have to adjust this call
    let endpoint = getEndpoint(`/api/auth/login`)
    return this.http.get(endpoint)
    .pipe(catchError(this.processhttp.handleError))
  }

  public logout(): Observable<any> {
    let endpoint = getEndpoint(`/api/auth/logout`)
    return this.http.get(endpoint)
    .pipe(catchError(this.processhttp.handleError))
  }
}
