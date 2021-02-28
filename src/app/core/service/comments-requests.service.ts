import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommentResponse, PostComment, UpdateComment,Comment } from 'src/app/models/comment';
 
@Injectable({
  providedIn: 'root'
})
export class CommentsRequestsService {

  /**
   * Creates an instance of comments requests service.
   * @param http 
   */
  constructor(private http: HttpClient) { }
/**
 * Get all comments from api
 * @returns all comments 
 */
getAllComments(): Observable<Array<Comment>> {
    return this.http.get<CommentResponse>('/comments').pipe(
      map(response => response.comments.data),
      tap(comments => comments.forEach(comment => comment.timestamp = comment.timestamp * 1000)));
  }
 /**
  * post comment to api 
  * @param comment 
  * @returns comment 
  */
 addComment(comment: PostComment): Observable<number> {
   return this.http.post<number>('/comment', comment);
  }

  /**
   * Update  comment to api 
   * @param comment 
   * @returns comment 
   */
  updateComment(comment: UpdateComment): Observable<void> {
   return  this.http.post<void>(`/comment/${comment.id}`, comment);
  }

  /**
   * Delete comment from api 
   * @param id 
   * @returns comment 
   */
  deleteComment(id: number): Observable<void> {
    return  this.http.delete<void>(`/comments/${id}`);
  }

}
