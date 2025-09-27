import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public isScrolled = false;
  public burgerVisib: boolean = false;

  constructor(private routing: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 79.5;
  }
  @ViewChild("BurgerDropdown") profileDropdown! : ElementRef;
  @HostListener("document:click", ['$event'])
  onDocumentClick(event : Event) {
    if(!this.profileDropdown.nativeElement.contains(event.target)) {
      this.burgerVisib = false
    }
  }
  BurgerDrop(event: Event) {
    event.stopPropagation();
    this.burgerVisib = !this.burgerVisib
  }
  BurgerClose() {
    this.burgerVisib = false
  }
}
