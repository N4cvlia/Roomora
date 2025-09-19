import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { SubjectsService } from './Services/subjects.service';
import { LoaderComponent } from './Components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Roomora';

  public loading: boolean = false;

  constructor(private subjects: SubjectsService) {
    this.loaderLogic()
  }

  ngOnInit(): void {
    
  }
  loaderLogic() {
    this.subjects.loaderLogic.subscribe( (data:boolean) => {
      this.loading = data
    } )
  }
}
