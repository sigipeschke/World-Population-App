import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, catchError, EMPTY } from 'rxjs';
import { PopDataService } from './model/popdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMessage = "";

  popData$ = this.popDataService.popData$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  private countrySearchedSubject = new BehaviorSubject<string>("");
  countrySearchedAction$ = this.countrySearchedSubject.asObservable();

  searchVisible = true;
  routerActivateEvent(event: any): void {
    if (event.constructor.name == 'GraphComponent') {this.searchVisible = true}
    else {this.searchVisible = false}
  }

  dropdownVisible = false;
  private _countryFilter: string = "";
  get countryFilter(): string {
    return this._countryFilter;
  }
  set countryFilter(s: string) {
    if (s.length == 0) {
      this.dropdownVisible = false;
    } else {
      this.dropdownVisible = true;
    }
    this._countryFilter = s;
    this.countrySearchedSubject.next(s);
  }

  filteredCountries$ = combineLatest([
    this.popDataService.popData$,
    this.countrySearchedAction$
  ]).pipe(
    map(([countries, filter]) => countries.filter(country => 
      country.countryName.toLocaleLowerCase().includes(filter.toLowerCase())
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedCountry$ = this.popDataService.selectedCountry$

  constructor(private popDataService: PopDataService) {}

  countrySelected(countryCode: string): void {
    console.log("Country selected: " + countryCode);
    this.popDataService.selectCountry(countryCode);
    this._countryFilter = "";
    this.countrySearchedSubject.next("");
    this.dropdownVisible = false;
  }
}
