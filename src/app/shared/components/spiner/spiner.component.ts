import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinerService } from '../../service/spiner.service';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent {
  spiner$: Observable<boolean>;

  /**
   * Creates an instance of spiner component.
   * @param spinerService 
   */
  constructor(private readonly spinerService: SpinerService
  ) {
    this.spiner$ = this.spinerService.geloading$;
  }


}
