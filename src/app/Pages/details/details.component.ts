import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from '../../Services/subjects.service';
import { ApiService } from '../../Services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit{
  public details: any;
  public imageArray: any;
  public rooms: any;
  public bookingError: boolean = false;
  public bookingSuccess: boolean = false;

  public filter: FormGroup = new FormGroup({
    checkInDate: new FormControl('yyyy-MM-dd', Validators.required),
    checkOutDate: new FormControl('yyyy-MM-dd', Validators.required),
    customerName: new FormControl("", Validators.required),
    customerPhone: new FormControl("+995", [
      Validators.pattern(/^\+995\d{9}$/),
      Validators.required,
    ]),
  })
  constructor(private actR: ActivatedRoute, private subjects: SubjectsService, private api: ApiService, private routing: Router) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.actR.data.subscribe( (data:any) => {
      this.details = data['Details']
      this.GetImages();
      this.GetOtherRooms();
    })
    
  }
  GetImages() {
    this.imageArray = [];
    this.details.images.forEach( (img:any) => {
      this.imageArray.push({
        image: img.source,
      })
    } )
  }
  GetOtherRooms() {
      this.api.GetAllRooms().subscribe( (data:any) => {
        this.rooms = data.filter( (room:any) => room.id != this.details.id ).slice(0,3);
      })
  }
  GoToDetails(id: number) {
    this.routing.navigate([`/Rooms`, id])
    window.scrollTo(0,0);
    this.GetOtherRooms();
  }
  Booking() {
    if(this.filter.valid) {
      const bookingData = {
        roomId: this.details.id,
        checkInDate: this.filter.value.checkInDate,
        checkOutDate: this.filter.value.checkOutDate,
        totalPrice: this.details.pricePerNight,
        isConfirmed: true,
        customerName: this.filter.value.customerName,
        customerId: `${5656}`,
        customerPhone: this.filter.value.customerPhone,
      }
      this.api.Booking(bookingData).subscribe( {
        next: () => {},
        error: (error:any) => {
          if(error.status === 400) {
            this.bookingError = true;
            this.bookingSuccess = false;
            setTimeout(() => {
              this.bookingError = false;
            }, 5000);
          }else if(error.status === 200) {
            this.bookingSuccess = true;
            this.bookingError = false;
            alert("Booking Successful!")
            setTimeout(() => {
              this.routing.navigate(['/'])
            }, 3000);
          }
        }
      })
    }else {
      alert("Please fill all required fields correctly.")
    }
  }
}
