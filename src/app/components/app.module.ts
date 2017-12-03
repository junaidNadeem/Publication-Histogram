import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyDateRangePickerModule} from 'mydaterangepicker';
import {ProgressbarModule} from 'ngx-bootstrap';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';

import {AppComponent}   from './app.component';
import {routing} from './app.routes';

import {NotificationService} from '../services/notification.service';
import {PublicationsChartComponent} from './publications-chart/publications-chart.component';
import {PublicationsChartService} from "../services/publications-chart.service";
import {AppConfig} from "./app.config";
declare let require: any;
import {ChartModule} from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}
@NgModule({
  imports: [
    BrowserModule,
    MyDateRangePickerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ProgressbarModule.forRoot(),
    routing,
    ChartModule
  ],
  declarations: [
    AppComponent,
    SlimLoadingBarComponent,
    PublicationsChartComponent,
  ],
  providers: [
    AppConfig,
    NotificationService,
    SlimLoadingBarService,
    PublicationsChartService, {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
