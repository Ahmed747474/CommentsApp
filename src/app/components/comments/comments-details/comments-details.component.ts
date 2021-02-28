import { Component, Input, OnInit } from '@angular/core';
import { CommentsRequestsService } from 'src/app/core/service/comments-requests.service';
import { CommentsService } from 'src/app/core/service/comments.service';
 import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments-details',
  templateUrl: './comments-details.component.html',
  styleUrls: ['./comments-details.component.scss']
})
export class CommentsDetailsComponent implements OnInit {
  /**
   * Input  of comments details component
   */
  @Input() comment: Comment;

  reply = false;
  edit = false ;
  /**
   * Creates an instance of comments details component.
   * @param commentsService 
   */
  constructor(private commentsService: CommentsService) {}

  /**
   * on init
   */
  ngOnInit() {
   }

  /**
   * Gets user first latter to generate placeholder img 
   */
  get userFirstLatter(): string {
     return this.comment.user.name[0].toUpperCase();
  }

  /**
   * change   reply state 
   */
  enableReply(): void {
    this.reply = true;
  }

  /**
   * Delete comments details component
   */
  delete(): void {
    this.commentsService.delete(this.comment.id);
  }

  /**
   * Disable textarea in add comments
   */
  disableCommentArea(): void {
    this.reply = false;
    this.edit = false ; 
  }
  /**
   * change edit state
   */
  enableEdit(): void{
    this.edit = true ;
  }
}
