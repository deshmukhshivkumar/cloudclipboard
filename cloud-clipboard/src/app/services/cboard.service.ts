import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ClipBoardItem } from "../model/ClipBoardItem"

@Injectable({
    providedIn: 'root',
  })
export class ClipBoardService {
    private httpService = inject(HttpClient);
    private serviceUrl;
    constructor() {
        this.serviceUrl ="https://5c1z33hx19.execute-api.ap-south-1.amazonaws.com/green?uid=u123";
        this.getClipBoards();
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(() => 'error occured; please try again later.');
      }

    getClipBoards(): Observable<any> {
        return this.httpService.get<ClipBoardItem[]>(this.serviceUrl).pipe(
            retry(3), catchError(this.handleError));;
    }
}