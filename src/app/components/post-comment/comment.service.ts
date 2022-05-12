import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/common';
import { comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {}
  SUB_URL: string = "api/comment/";
  //Comment URL
  
  private newCommentUrl =
    baseUrl.BASE_URL + this.SUB_URL + "newComment";
  private getCommentsByPostIdUrl =
    baseUrl.BASE_URL + this.SUB_URL + "getCommentsByPostId";

    newComment(comment: comment): Observable<comment> {
    return this.httpClient.post<comment>(`${this.newCommentUrl}`, comment);
  }
  getCommentsByPostId(postId:string):Observable<comment[]> {
    return this.httpClient.get<comment[]>(`${this.getCommentsByPostIdUrl}/${postId}`);
  }
}
