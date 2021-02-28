import { GetComment ,Comment } from "src/app/models/comment";

 
export class CommentMapper {
  /**
   * Map parednt  comments   with reply comments and return new array of comments
   * @param coments 
   * @returns get comments 
   */
  static MapGetComments(coments: Array<GetComment>): Array<Comment> {
    
    if (!coments || coments.length == 0) return [];
     const commentsDict = new Map<number, Comment>();

    return coments.map(comment => {
      const { parentId, ...rest } = comment;
      const commentToreturn: Comment = {
        parent: commentsDict.get(parentId),
        ...rest
      };

      commentsDict.set(comment.id, commentToreturn);

      return commentToreturn;
    });

  }
}
