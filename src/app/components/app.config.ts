export class AppConfig {
  public readonly apiUrl; //api service URL

  constructor() {
    this.apiUrl = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search';
  }

  getApiURI() {
    return this.apiUrl;
  }
}
;
