import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { vote } from "./vote";
@Injectable({
  providedIn: "root",
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}
  SUB_URL: string = "api/vote/";
  //Vote URL
  
  private postLikedByUserUrl =
    baseUrl.BASE_URL + this.SUB_URL + "postLikedByUser";

  postLikedByUser(vote: vote): Observable<Object> {
    return this.httpClient.post(`${this.postLikedByUserUrl}`, vote);
  }
 
}
