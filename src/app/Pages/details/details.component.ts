import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

}
