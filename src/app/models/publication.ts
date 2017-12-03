import {SerializationHelper} from "../directives/index";

interface PublicationSerialized {
  title: string;
  pubYear: number;
  citedByCount: number;
}
export class Publication {

  //json Keys
  private static _COUNT_KEY: string = 'hitCount';
  private static _RESULTLIST_KEY: string = 'resultList';
  private static _RESULT_KEY: string = 'result';

  constructor(public _title: string = 'None', public _pubYear: number = 0, public _citedByCount: number = 0,
              public y: number = 0, public _publicationCount: number = 0) {
  }

  //map JSON to class object
  fromJSON(obj: PublicationSerialized) {
    this._title = obj.title;
    this._pubYear = obj.pubYear;
    this._citedByCount = obj.citedByCount;
  }

  //parse response json (based on json structure) to get class object or list of objects
  static fillFromJSON(jsonList: any) {
    let arrPublication: Publication[] = [];

    for (var jsonObj in jsonList) {
      let publicationJsonObj = jsonList[jsonObj];
      if (publicationJsonObj[Publication.RESULTLIST_KEY] != null &&
        publicationJsonObj[Publication.RESULTLIST_KEY][Publication.RESULT_KEY] != null) {
        let publicationResult = publicationJsonObj[Publication.RESULTLIST_KEY][Publication.RESULT_KEY];
        if (publicationResult[0]) {
          let pubObj = SerializationHelper.toInstance(new Publication(), publicationResult[0]);
          if (publicationJsonObj[Publication._COUNT_KEY] != null) {
            pubObj.publicationCount = publicationJsonObj[Publication._COUNT_KEY];
            pubObj.y = pubObj.publicationCount;
          }
          arrPublication.push(pubObj);
        }
        else
          arrPublication.push(new Publication);
      }
    }

    return arrPublication;
  }


  /////  getters/setters /////

  static get COUNT_KEY(): string {
    return this._COUNT_KEY;
  }

  static set COUNT_KEY(value: string) {
    this._COUNT_KEY = value;
  }

  static get RESULTLIST_KEY(): string {
    return this._RESULTLIST_KEY;
  }

  static set RESULTLIST_KEY(value: string) {
    this._RESULTLIST_KEY = value;
  }

  static get RESULT_KEY(): string {
    return this._RESULT_KEY;
  }

  static set RESULT_KEY(value: string) {
    this._RESULT_KEY = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get pubYear(): number {
    return this._pubYear;
  }

  public set pubYear(value: number) {
    this._pubYear = value;
  }

  public get citedByCount(): number {
    return this._citedByCount;
  }

  public set citedByCount(value: number) {
    this._citedByCount = value;
  }

  public get publicationCount(): number {
    return this._publicationCount;
  }

  public set publicationCount(value: number) {
    this._publicationCount = value;
  }
}





