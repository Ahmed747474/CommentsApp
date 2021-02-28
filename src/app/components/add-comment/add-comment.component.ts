import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from 'src/app/core/service/comments.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() parentId: number;
  @Input() commentEdit: Comment;
  @Output() done = new EventEmitter<boolean>();

  comment: string;
  enableEdit = false;
  /**
   * Creates an instance of add comment component.
   * @param commentsService 
   */
  constructor(
    private readonly commentsService: CommentsService,
  ) {

  }
/**
 * on init
 */
ngOnInit(): void {
    if (this.commentEdit) {
      this.comment = this.commentEdit.comment;
      this.enableEdit = true;
    }
  }

  /**
   * add comments  middleware
   * if comments has parentId  the add comments state is reply
   * if comments has text  the add comments state is edit
   * else add new comment
   * 
   * 
   */
  commentMiddleware (): void {
     
    if (!isNaN(this.parentId) && !this.enableEdit) {
      this.replyComment();

    }
    else if (this.enableEdit) {
      this.editComment();
      this.enableEdit = false;
    } else {
      this.newComment();
    }

    // emit done event to close Add comment textarea
    this.comment = '';
    this.done.next();
  }
  
/**
 * Reply comment 
 */
private replyComment(): void {
    this.commentsService.reply({
      id: (Math.random() * 100),
      comment: this.comment,
      parentId: this.parentId,
      user: {
        email: 'ahmed.nader5549@gmail.com',
        name: 'Ahmed Nader'
      },
      timestamp: Date.now(),
    }, this.parentId);
  }
/**
 * add new  comment
 */
private newComment(): void {
    this.commentsService.addComment({
      id: (Math.random() * 100),
      comment: this.comment,
      user: {
        email: '',
        name: 'you'
      },
      timestamp: Date.now(),
    });
  }

  /**
   * Edit comment
   */
  private editComment(): void {
     
    this.commentsService.update({
      id: this.commentEdit.id,
      comment: this.comment,
      user: {
        email: this.commentEdit.user.email,
        name: this.commentEdit.user.name
      },
      timestamp: Date.now(),
    });
  }
}
