import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PopDataService } from './model/popdata.service';
import { GraphComponent } from './graph/graph.component';
import { NgChartsModule } from 'ng2-charts';
import { FlagComponent } from './flag/flag.component';
import { FlagService } from './flag/flag.service';
import { MapComponent } from './map/map.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    FlagComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    HighchartsChartModule
  ],
  providers: [PopDataService, FlagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
