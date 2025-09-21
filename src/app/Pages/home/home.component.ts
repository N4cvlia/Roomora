import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router, RouterLink } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private Api: ApiService, private subjects: SubjectsService, private routing: Router) { }

  ngOnInit(): void {
    this.Api.GetAllRooms().subscribe((res: any) => {
      this.subjects.roomsCache.next(res);
    });
    this.Api.GetAllHotels().subscribe((res: any) => {
      this.subjects.hotelsCache.next(res);
    })
    window.scrollTo(0,0);
  }
  GoToDetails(id: number) {
    this.routing.navigate([`/Rooms`, id] )
  }
}
