import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  imports: [ ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit{
  public details: any;
  public imageArray: any;
  constructor(private actR: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.actR.data.subscribe( (data:any) => {
      console.log(data['Details']);
      this.details = data['Details']
      this.GetImages();
    })
  }
  GetImages() {
    this.imageArray = [];
    this.details.images.forEach( (img:any) => {
      this.imageArray.push({
        image: img.source,
      })
    } )
    console.log(this.imageArray);
  }

}
