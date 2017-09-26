import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  protected restaurantsSubject: Subject<Restaurant[]>;
  protected errorSubject: Subject<HttpError>;

  public restaurants$: Observable<Restaurant[]>;
  public error$: Observable<HttpError>;

  constructor(private http: Http) {
    this.restaurantsSubject = new Subject();
    this.restaurants$ = this.restaurantsSubject.asObservable();

    this.errorSubject = new Subject();
    this.error$ = this.errorSubject.asObservable();
  }

  public fetchData(url: string) {
    console.log('Fetching data...');
    this.http.get(url)
      .map(response => response.json())
      .catch((error: Response) => Observable.throw(new FetchHttpError(error.text())))
      .subscribe(
        data => this.restaurantsSubject.next(data),
        error => this.errorSubject.next(error)
      );
  }
}

export class Restaurant {
  constructor (
      public id: number,
      public name: string
  ) {}
}

export abstract class HttpError {
  constructor(public text: string) {}
}

export class FetchHttpError extends HttpError {}
