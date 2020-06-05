import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { base_url } from '../shared/baseURL';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LineOfService, StandardDay, ModifiedDay } from '../shared/interfaces';
import { getEndpoint, generateHeaders } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {

  constructor(private http: HttpClient, private processhttp: ProcessHttpmsgService) { }

  createService(los): Observable<any> {
    // let headers = generateHeaders('post');
    let endpoint = getEndpoint('/api/services');
    return this.http.post(endpoint, los)
    .pipe(catchError(this.processhttp.handleError))
  }

  createModifiedDay(modified): Observable<any> {
    // let headers = generateHeaders('post');
    let endpoint = getEndpoint('/api/modified', modified.lineOfServiceId);
    return this.http.post(endpoint, modified)
    .pipe(catchError(this.processhttp.handleError))
  }

  deleteModifiedDay(modified): Observable<any> {
    // let headers = generateHeaders('delete');
    let endpoint = getEndpoint(`/api/modified/${modified.name}`, modified.lineOfServiceId+'/'+modified.id);
    return this.http.delete(endpoint)
    .pipe(catchError(this.processhttp.handleError))
  }

  deleteService(service): Observable<any> {
    console.log("FROM SERVICES: ", service)
    let endpoint = getEndpoint(`/api/services`, service.id);
    return this.http.delete(endpoint)
    .pipe(catchError(this.processhttp.handleError))
  }

  getAll(): Observable<any> {
    //const headers = generateHeaders('get');
    let endpoint = getEndpoint('/api/services');
    return this.http.get(endpoint)
    //.pipe(catchError(this.processhttp.handleError))
  }

  updateModifiedDay(row: ModifiedDay): Observable<any> {
    // const headers = generateHeaders('put');
    let endpoint = getEndpoint('/api/modified', row.lineOfServiceId);
    return this.http.put(endpoint, row)
    .pipe(catchError(this.processhttp.handleError))
  }

  updateStandardDay(row: StandardDay): Observable<any> {
    // const headers = generateHeaders('put');
    let endpoint = getEndpoint('/api/standard', row.lineOfServiceId);
    return this.http.put(endpoint, row)
    .pipe(catchError(this.processhttp.handleError))
  }
}
