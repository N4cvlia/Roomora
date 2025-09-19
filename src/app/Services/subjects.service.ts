import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  public loaderLogic: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public roomsCache: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  public hotelsCache: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  startLoading() {
    this.loaderLogic.next(true)
  }

  stopLoading() {
    this.loaderLogic.next(false)
  }
}
