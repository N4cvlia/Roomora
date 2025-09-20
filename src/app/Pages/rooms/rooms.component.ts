import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-rooms',
  imports: [ReactiveFormsModule, FormsModule, NgxSliderModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit{
  public rooms: any;
  public minRange: number = 10;
  public maxRange: number = 1000;
  public rangeStep: number = 10;

  public minVal: number = 100;
  public maxVal: number = 900;

  options: Options = {
    floor: 50,
    ceil: 1000,
  };

  public filter: FormGroup = new FormGroup({
    roomTypeId: new FormControl(""),
    priceFrom: new FormControl(this.minVal),
    priceTo: new FormControl(this.maxVal),
    checkInTime: new FormControl('yyyy-MM-dd'),
    checkOutTime: new FormControl('yyyy-MM-dd'),
    maxsimumGuests: new FormControl(1),
  })
  constructor(private api: ApiService, private subjects: SubjectsService, private routing: Router) {}

  ngOnInit(): void {
    if(this.subjects.roomsCache.value.length > 0) {
      this.rooms = this.subjects.roomsCache.value
    }else {
      this.api.GetAllRooms().subscribe( (data:any) => {
        this.rooms = data;
        console.log(data);
        this.subjects.roomsCache.next(data)
      })
    }
  }
  applyFilter() {
    this.api.GetFilteredRooms(this.filter.value).subscribe( (data:any) => {
      this.rooms = data;
      console.log(data);
      this.subjects.roomsCache.next(data)
    })
  }
  onSliderChange(event:any) {
    this.filter.patchValue({
      priceFrom: this.minVal,
      priceTo: this.maxVal
    })
  }
  resetFilter() {
    this.filter.reset({
      roomTypeId: "",
      priceFrom: this.minRange,
      priceTo: this.maxRange,
      checkInTime: 'yyyy-MM-dd',
      checkOutTime: 'yyyy-MM-dd',
      maxsimumGuests: 1,
    })
    this.minVal = this.minRange
    this.maxVal = this.maxRange
    this.api.GetAllRooms().subscribe( (data:any) => {
      this.rooms = data;
      console.log(data);
      this.subjects.roomsCache.next(data)
    })
  }
  GoToDetails(id: number) {
    this.routing.navigate([`/Rooms`, id] )
  }
}
