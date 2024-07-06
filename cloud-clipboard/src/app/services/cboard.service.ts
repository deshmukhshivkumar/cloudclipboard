import { HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class ClipBoardService {
    private httpService = inject(HttpClientModule);

    constructor(private http: HttpClientModule) { }

    getClipBoards(): Observable<any> {
        let localUrl ="https://5c1z33hx19.execute-api.ap-south-1.amazonaws.com/green?uid=u123";
        return this.httpService.get<any[]>(localUrl);
      }
}