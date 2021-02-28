import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/core/service/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  /**
   * Input  of comments component
   */
  @Input() comments: Array<Comment>;
 
/**
 * Tracks by fn
 * @param index 
 * @param item 
 * @returns  last item
 */
trackByFn(index,item) {
    return item.id;
  }

}
