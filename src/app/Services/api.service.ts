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
  GetFilteredRooms(body: any) {
    return this.http.post('https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered', body);
  }
  GetAllHotels() {
    return this.http.get('https://hotelbooking.stepprojects.ge/api/Hotels/GetAll');
  }
  GetHotelRoomsById(id: number) {
   return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  }
}
