import {Component, OnInit, trigger, state, style, animate, transition} from '@angular/core';
import {NotificationService, PublicationsChartService} from "../../services/index";
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Publication} from "../../models/index";
import {Observable} from 'rxjs/Rx';
import {IMyDrpOptions} from 'mydaterangepicker';
import 'rxjs/add/operator/finally';

declare var chart: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-publications-chart',
  templateUrl: 'publications-chart.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s  ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})

export class PublicationsChartComponent implements OnInit {

  // variables
  myDateRangePickerOptions: IMyDrpOptions = {dateFormat: 'yyyy', monthSelector: false};
  publicationArr: Publication[] = [new Publication()];
  model: any = {input: '', searchText: '', date: {}};
  searchClicked: boolean = false;
  chartOptions: any;
  chart: any;

  constructor(private publicationsChartService: PublicationsChartService, private notificationService: NotificationService,
              private loadingBarService: SlimLoadingBarService) {
    this.chartOptions = {
      chart: {type: 'column'},
      title: {text: 'Chart: Number Of Publications Per Year'},
      legend: {
        verticalAlign: 'bottom',
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>Year:</b> {point.x}<br/>',
        pointFormat: '<b>Total Publications:</b> {point.y}<br/><b>Most Cited Paper:</b> {point._title}<br/>' +
        '<b>Cited Count:</b> {point._citedByCount}'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          }
        }
      },
      colors: ['#b3eab7'],
      xAxis: {
        title: {
          text: 'Year'
        }
      },
      yAxis: {
        title: {
          text: "No. of Publications"
        }
      },
      series: [{
        name: "Publications Per Year",
        data: this.publicationArr,
      }]
    };
  }

  ngOnInit() {
  }

  // fetch publications
  loadPublications(input: string = 'malaria', minYear: number = 2013, maxYear: number = 2017) {
    this.loadingBarService.start();
    let observables: any = [];

    // push api call observable for each year
    for (let i = minYear; i <= maxYear; i++)
      observables.push(this.publicationsChartService.getPublications(input + ' ' + 'PUB_YEAR:' + i));

    // subscribe to api call observables
    Observable.forkJoin(observables)
      .finally(() => {
        this.searchClicked = true;
        this.model.searchText = this.model.input;
        this.loadingBarService.complete();
        $('body, html').animate({scrollTop: $("#chartSection").offset().top}, 1000);
      })
      .subscribe((res) => {
          this.publicationArr = Publication.fillFromJSON(res);
          this.chart.series[0].setData(this.publicationArr);
          this.chart.xAxis[0].setCategories(this.getYearsRangeList(minYear, maxYear));
        },
        error => {
          this.notificationService.printErrorMessage('Failed to load publications-chart. Status: ' + error);
        });
  }

  // Checking if year range added else use default range.
  // Date model format = {beginDate: {year: 2018}, endDate: {year: 2018}};
  onSubmitSearch(input: string, date: any) {
    let beginYear = 2013, endYear = 2017;
    if (date) {
      if (date.beginDate)
        beginYear = date.beginDate.year;
      if (date.endDate)
        endYear = date.endDate.year;
    }
    console.log(input + ' ' + beginYear + ' ' + endYear);
    this.loadPublications(input, beginYear, endYear);
  }

  // get list of year range to show in chart
  getYearsRangeList(minYear: number, maxYear: number): number[] {
    let yearArr: number[] = []
    for (let i = minYear; i <= maxYear; i++) {
      yearArr.push(i);
    }
    return yearArr;
  }

  // save chart instance to update its data later
  saveChartInstance(chartInstance): void {
    this.chart = chartInstance;
  }
}
