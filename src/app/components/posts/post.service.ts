import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { post } from "./post";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  private BASEURL:string = "api/post/"
  //Post URL
  private newPostUrl = baseUrl.BASE_URL + this.BASEURL+"newPost";
  private getPostsUrl = baseUrl.BASE_URL + this.BASEURL
  private allPostByUserIdUrl = baseUrl.BASE_URL + this.BASEURL+"allPostByUserId";
  private getPostByIdUrl = baseUrl.BASE_URL + this.BASEURL+"getPost/";
  private deletePostUrl = baseUrl.BASE_URL + this.BASEURL+"deletePost";
  private getUserPostUrl = baseUrl.BASE_URL + this.BASEURL+"getUserPost/";
  private updatePostUrl = baseUrl.BASE_URL + this.BASEURL+"updatePost/";

  newPost(post: post): Observable<Object> {
    return this.httpClient.post(`${this.newPostUrl}`, post);
  }
  getPosts() {
    return this.httpClient.get(`${this.getPostsUrl}`);
  }
  allPostByUserId(id:string):Observable<post[]> {
    return this.httpClient.get<post[]>(`${this.allPostByUserIdUrl}/${id}`);
  }
  getUserPost(userId: number) {
    return this.httpClient.get(`${this.getUserPostUrl}/${userId}`);
  }
  getPostById(id: string):Observable<post> {
    return this.httpClient.get<post>(`${this.getPostByIdUrl}/${id}`);
  }
  deletePost(id: string):Observable<post> {
    return this.httpClient.delete<post>(`${this.deletePostUrl}/${id}`);
  }
  updatePost(post: post): Observable<Object> {
    return this.httpClient.put(`${this.updatePostUrl}`, post);
}
}
