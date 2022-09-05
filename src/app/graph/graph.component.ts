import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { tap, catchError, EMPTY } from 'rxjs';
import { PopDataService } from 'src/app/model/popdata.service';
import { PopData } from 'src/app/model/popdata';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  //@ViewChild(BaseChartDirective) 
  //chart: BaseChartDirective;
  title = 'chart';
  worldData: number[] = [];
  worldPop: PopData = {
    countryName: "World",
    countryCode: "WRD",
    indicatorName: "",
    indicatorCode: "",
    p1960: 0,
    p1961: 0,
    p1962: 0,
    p1963: 0,
    p1964: 0,
    p1965: 0,
    p1966: 0,
    p1967: 0,
    p1968: 0,
    p1969: 0,
    p1970: 0,
    p1971: 0,
    p1972: 0,
    p1973: 0,
    p1974: 0,
    p1975: 0,
    p1976: 0,
    p1977: 0,
    p1978: 0,
    p1979: 0,
    p1980: 0,
    p1981: 0,
    p1982: 0,
    p1983: 0,
    p1984: 0,
    p1985: 0,
    p1986: 0,
    p1987: 0,
    p1988: 0,
    p1989: 0,
    p1990: 0,
    p1991: 0,
    p1992: 0,
    p1993: 0,
    p1994: 0,
    p1995: 0,
    p1996: 0,
    p1997: 0,
    p1998: 0,
    p1999: 0,
    p2000: 0,
    p2001: 0,
    p2002: 0,
    p2003: 0,
    p2004: 0,
    p2005: 0,
    p2006: 0,
    p2007: 0,
    p2008: 0,
    p2009: 0,
    p2010: 0,
    p2011: 0,
    p2012: 0,
    p2013: 0,
    p2014: 0,
    p2015: 0,
    p2016: 0,
    p2017: 0,
    p2018: 0,
    p2019: 0,
    p2020: 0,
    p2021: 0,
  };
  notACountry: String[] = ["AFE", 'AFW', 'ARB', 'CEB', 'EAP', 'EAR', 'EAS', 'ECA', 'ECS', 'EMU', 'EUU', 'FCS', 'HIC', 'HPC', 'IBD', 'IBT', 'IDA', 'IDB', 'IDX', 'LAC', 'LCN', 'LDC', 'LIC', 'LMC', 'LMY', 'LTE', 'MEA', 'MIC', 'MNA', 'NAC', 'OED', 'OSS', 'PRE', 'PST', 'SAS', 'SSA', 'SSF', 'SST', 'TEA', 'TEC', 'TLA', 'TMN', 'TSA', 'TSS', 'UMC', "WLD"];

  popData$ = this.popDataService.popData$
  .pipe(
    tap((popData) => {
      this.formatData(popData.find(country => country.countryCode==="WLD")!);
    }),
    catchError(err => {
      return EMPTY;
    })
  );
  
  selectedCountry$ = this.popDataService.selectedCountry$.subscribe({
    next: (country) => {
      this.formatData(country!);
    },
    error: (e) => console.error(e)
  });

  constructor(private popDataService: PopDataService) {
  }

  ngOnInit() {
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Population',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  private formatData(country: PopData): void {
    this.worldData = [country.p1960,country.p1961,country.p1962,country.p1963,country.p1964,
      country.p1965,country.p1966,country.p1967,country.p1968,country.p1969,
      country.p1970,country.p1971,country.p1972,country.p1973,country.p1974,
      country.p1975,country.p1976,country.p1977,country.p1978,country.p1979,
      country.p1980,country.p1981,country.p1982,country.p1983,country.p1984,
      country.p1985,country.p1986,country.p1987,country.p1988,country.p1989,
      country.p1990,country.p1991,country.p1992,country.p1993,country.p1994,
      country.p1995,country.p1996,country.p1997,country.p1998,country.p1999,
      country.p2000,country.p2001,country.p2002,country.p2003,country.p2004,
      country.p2005,country.p2006,country.p2007,country.p2008,country.p2009,
      country.p2010,country.p2011,country.p2012,country.p2013,country.p2014,
      country.p2015,country.p2016,country.p2017,country.p2018,country.p2019,
      country.p2020,country.p2021
    ];
    this.lineChartData = {
      labels: [
        '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969',
        '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979',
        '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989',
        '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
        '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
        '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019',
        '2021',
      ],
      datasets: [
        {
          data: this.worldData,
          label: country.countryName + "'s Total Population",
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    };
    console.log('Data conglomerated');
  };

}
