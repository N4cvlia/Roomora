import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { SubjectsService } from '../../Services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  imports: [],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit{
  public hotels: any;
  constructor(private Api: ApiService, private subjects: SubjectsService, private routing: Router) { }

  ngOnInit(): void {
    if(this.subjects.hotelsCache.value.length > 0) {
      this.hotels = this.subjects.hotelsCache.value
    }else {
      this.Api.GetAllHotels().subscribe( (data:any) => {
        this.hotels = data;
        console.log(data);
        this.subjects.hotelsCache.next(data)
      })
    }
  }

  GoToHotel(id: number) {
    this.Api.GetHotelRoomsById(id).subscribe( (data:any) => {
      this.subjects.roomsCache.next(data.rooms)
      this.routing.navigate(['/Rooms'])
    })
    
  }

}
