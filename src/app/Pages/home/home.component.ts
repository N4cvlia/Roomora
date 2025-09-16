import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public rooms: any;

  constructor(private Api: ApiService) { }

  ngOnInit(): void {
    this.Api.GetAllRooms().subscribe((res) => {
      console.log(res);
      this.rooms = res;
    });
  }

}
