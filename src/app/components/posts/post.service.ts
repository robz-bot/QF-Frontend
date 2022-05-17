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
  //Post URL
  private newPostUrl = baseUrl.BASE_URL + "api/post/newPost";
  private getPostsUrl = baseUrl.BASE_URL + "api/post/";
  private allPostByUserIdUrl = baseUrl.BASE_URL + "api/post/allPostByUserId";
  private getPostByIdUrl = baseUrl.BASE_URL + "api/post/getPost/";
  private getUserPostUrl = baseUrl.BASE_URL + "api/post/getUserPost/";

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
}
