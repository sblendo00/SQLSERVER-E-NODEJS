import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  postObserver: Observable<Object>;
  postData: Object;
  constructor(private http: HttpClient) { }

  ngOnInit():void{
//Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-b8c26e67-67ce-4067-a9ec-198e6bd06dbc.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => { this.data = data; });
  }

  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
    let newData = new Unit(newUnit.value, newCost.value, newHitSpeed.value);
    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.postObserver = this.http.post('https://3000-b8c26e67-67ce-4067-a9ec-198e6bd06dbc.ws-eu01.gitpod.io/users/add', JSON.stringify(newData), headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

}


