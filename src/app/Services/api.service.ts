import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  GetAllRooms() {
    return this.http.get('https://hotelbooking.stepprojects.ge/api/Rooms/GetAll');
  }
}
