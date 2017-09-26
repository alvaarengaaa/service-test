import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { DataService, Restaurant, FetchHttpError } from './data.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  restaurants:  Restaurant[];
  id: any;
  url = 'https://sistema-restaurantes.firebaseio.com/restaurants.json';
  error: Subject<string> = new Subject();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.dataService.fetchData(this.url);
    this.dataService.restaurants$.subscribe(x => {
      this.restaurants = x;
      this.error.next('');
      console.log('Data loaded.');
    });
    this.dataService.error$
      .filter(error => error instanceof FetchHttpError)
      .subscribe(error => {
        this.error.next(error.text);
        this.restaurants = [];
      });
  }

  onLoad() {
    this.dataService.fetchData(this.url);
  }
}
