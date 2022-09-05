import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, tap, catchError, throwError, shareReplay} from "rxjs";
import { Flag } from './flag';

@Injectable({
  providedIn: 'root'
})
export class FlagService {
  startURL = "https://flagicons.lipis.dev/";
  flagDataUrl = "assets/flags.json";

  flagData$ = this.http.get<Flag[]>(this.flagDataUrl)
    .pipe(
      tap(() => console.log('Flag data received')),
      catchError(this.handleError),
      shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
