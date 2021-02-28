import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {

  /**
   * Loading$ BehaviorSubject of spiner service
   */
  private  loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  /**
   * loading getter 
   */
  get geloading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  /**change loading state to true 
   */
  setLoading(): void {
    this.loading$.next(true);
  }

  /**
   *change loading state to false  
   */
  clearLoading(): void {
    this.loading$.next(false);
  }
}
