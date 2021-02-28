import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentMapper } from './../service/mapper';
import { Comment, GetComment, UpdateComment } from 'src/app/models/comment';
import { SpinerService } from 'src/app/shared/service/spiner.service';
import { CommentsRequestsService } from './comments-requests.service';
import { first, map, take } from 'rxjs/operators';
import { AlertifyService } from 'src/app/shared/service/alertify.service';
 
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

/**
 * Comments$ subject to share comments in our project
 */
private readonly _comments$ = new BehaviorSubject<Array<GetComment>>([]);

/**
 * Create an instance of comments service.
 * @param http 
 * @param loading 
 */
constructor(
    private readonly http: CommentsRequestsService,
    private readonly loading: SpinerService,
    private readonly alertify: AlertifyService
  ) { }

  /**
   * Getter comments$ as observable
   */
  get comments$(): Observable<Array<Comment>> {
    return this._comments$.pipe(
         map(getComments => 
          CommentMapper.MapGetComments(getComments))
  
    );
  }

  /**
   * Get comments 
   */
  getComments(): void {
    this.loading.setLoading()

    this.http.getAllComments().subscribe(
      comments  => this.getComment(comments),
      error => this.alertify.error( 'Something went wrong when loading comments.'),
      () => this.loading.clearLoading()
    );
  }

  /**
   * Add comment 
   * @param comment 
   */
  addComment(comment: GetComment): void {
    this.loading.setLoading();

    this.http.addComment(comment).subscribe(
      _  => this.addCommentSimulation(comment),
      error => this.alertify.error( 'Something went wrong when adding comment, try again.'),
      () => this.loading.clearLoading()
    );
  }

  /**
   * Reply comments service
   * @param comment 
   * @param id 
   */
  reply(comment: GetComment, id: number): void {
    this.loading.setLoading();

    this.http.addComment(comment).subscribe(
      _  => this.replySimulation(comment, id),
      error => this.alertify.error( 'Something went wrong when reply to comment, try again.'),
      () => this.loading.clearLoading()
    );
  }

/**
 * Update comments service
 * @param comment 
 */
update(comment: UpdateComment){
this.loading.setLoading();
this.http.updateComment(comment).subscribe(
  _ => this.updateCommentSimulation(comment),
  error => this.alertify.error( 'Something went wrong when update comment, pleas try again.'),
  () => this.loading.clearLoading()
);
}
/**
 * Delete comments service
 * @param id 
 */
delete(id: number): void {
    this.loading.setLoading();

    this.http.deleteComment(id).subscribe(
      _  => this.deleteSimulation(id),
      error => this.alertify.error( 'Something went wrong when delete comment, try again.'),
      () => this.loading.clearLoading()
    );
  }

 
/**
 * Gets comment
 * @param comment 
 */
private getComment(comment: Array<Comment>): void {
    this._comments$.next(comment);
  }

  /**
   * Reply simulation becuse the api is mock dont't effect
   * @param comment 
   * @param id 
   */
  private replySimulation(comment: GetComment, id: number): void {
    const current = this._comments$.getValue();
    const index = current.findIndex(comment => comment.id === id);
    const insertAt = index >= 0 ? index : 0;
    current.splice(insertAt + 1, 0, comment);

    this._comments$.next(current);
    this.alertify.success('Comment successfully replayed');

  }

  /**
   * Delete simulation becuse the api is mock dont't effect
   * @param id 
   */
  private deleteSimulation(id: number): void {
    const current = this._comments$.getValue();
    const index = current.findIndex(comment => comment.id === id);
    const insertAt = index >= 0 ? index : 0;
    current.splice(insertAt, 1);

    this._comments$.next(current);
    this.alertify.success('Comment successfully deleted');
  }

  /**
   * Add comment simulation becuse the api is mock dont't effect
   * @param newComment 
   */
  private addCommentSimulation(newComment: GetComment): void {
    const current = this._comments$.getValue();
    const newComments = [newComment, ...current];
    this._comments$.next(newComments);
    this.alertify.success('Comment successfully added');

  }
  /**
   * Update comment simulation becuse the api is mock dont't effect
   * @param comment 
   */
  private updateCommentSimulation(comment: UpdateComment){
     
    const current = this._comments$.getValue();
    current.forEach((c )=>{ 
      if( c.id == comment.id) {
        c.comment = comment.comment;
      }
     });
    this._comments$.next(current);
    this.alertify.success('Comment successfully updated');

  }
}
