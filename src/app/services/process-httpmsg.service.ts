import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    console.log("FROM PROCESS ERROR: ", error)
    if(error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else if (error.status == 200) {
      errMsg = error.url;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''}`
    }
    return throwError(errMsg);
  }
}
