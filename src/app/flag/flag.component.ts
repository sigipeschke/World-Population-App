import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError, EMPTY, combineLatest } from "rxjs";
import { PopDataService } from '../model/popdata.service';
import { Flag } from './flag';
import { FlagService } from './flag.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  errorMessage = "";

  popData$ = this.popDataService.popData$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  flagData$ = this.flagService.flagData$
  .pipe(
    map(flagData => this.filterFlags(flagData)),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  private flagSelectedSubject = new BehaviorSubject<string>("");
  flagSelectedAction$ = this.flagSelectedSubject.asObservable();

  selectedFlag$ = combineLatest([
    this.popData$,
    this.flagSelectedAction$
  ]).pipe(
    map(([countries, selectedCountryName]) => {
        countries.find(country => country.countryName === selectedCountryName);
      }),
  );

  constructor(private flagService: FlagService,
              private popDataService: PopDataService) { }

  ngOnInit(): void {
  }

  filterFlags(flagData: Flag[]): Flag[] {
    return flagData.filter(country => (["ax", "ai", "aq", "ac", "bs", "bq", "bv", "io", "ic", "es-ct", "cefta", "ea", "cx", "cp", "cc", "ck", "cw", "xx"].indexOf(country.code) < 0));
  }

  flagSelected(countryName: string): void {
    console.log("Flag selected: " + countryName);
    this.flagSelectedSubject.next(countryName);
    this.popDataService.selectFlag(countryName);
  }
}
