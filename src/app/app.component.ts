import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService } from './core/service/comments.service';
import { Comment } from './models/comment';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  /**
   * Comments$  of app component
   */
  comments$: Observable<Array<Comment>>;

  /**
   * Creates an instance of app component.
   * @param commentsService 
   */
  constructor(private readonly commentsService: CommentsService) {
      this.commentsService.getComments();
   this.comments$ = this.commentsService.comments$;

  }
   
}
