import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {Publication} from '../models/index';
import {AppConfig} from "../components/app.config";

@Injectable()
export class PublicationsChartService {

  constructor(private http: Http, private appConfig: AppConfig) {
  }

  //Fetch publications based on input
  getPublications(query: string): Observable< Publication[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('query', query); //'malaria PUB_YEAR:2001'
    cpParams.set('sort', 'CITED desc');
    cpParams.set('format', 'json');
    cpParams.set('pageSize', '1');
    let options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.appConfig.getApiURI(), options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  //Data Extractor from json
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
