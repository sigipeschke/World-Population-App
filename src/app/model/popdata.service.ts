import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError, throwError, combineLatest, shareReplay } from "rxjs";
import { PopData } from './popdata';


@Injectable({
  providedIn: 'root'
})
export class PopDataService {
  popDataUrl = "assets/pop_data/popdata.json";

  popData$ = this.http.get<PopData[]>(this.popDataUrl)
    .pipe(
      tap(() => console.log('Population data received')),
      catchError(this.handleError),
      shareReplay(1)
  );

  private countrySelectedSubject = new BehaviorSubject<string>("WLD");
  countrySelectedAction$ = this.countrySelectedSubject.asObservable();

  selectedCountry$ = combineLatest([
      this.popData$,
      this.countrySelectedAction$
  ]).pipe(
      map(([countries, selectedCountryCode]) =>
          countries.find(country => country.countryCode === selectedCountryCode)
      ),
      shareReplay(1)
  );

  constructor(private http: HttpClient) { }

  selectFlag(selectedCountry: string): void {
    this.popData$.subscribe({
      next: (countries) => {
        this.selectCountry(countries.find(country => country.countryName === selectedCountry)!.countryCode);
      },
      error: (e) => console.error(e)
    });
  };

  selectCountry(selectedCountry: string): void {
    this.countrySelectedSubject.next(selectedCountry);
  };

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  };
}
