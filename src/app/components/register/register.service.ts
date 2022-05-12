import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { register } from "./register";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "src/app/common";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}
  SUB_URL: string = "api/auth/";
  //Auth URL
  private signupUrl = baseUrl.BASE_URL+ this.SUB_URL + "signup";
  private loginUrl = baseUrl.BASE_URL+ this.SUB_URL + "login";
  private profileUrl = baseUrl.BASE_URL+ this.SUB_URL + "profile";
  private getuserProfileUrl = baseUrl.BASE_URL+ this.SUB_URL + "getuserProfile";

  registerNewUser(user: register): Observable<register> {
    return this.httpClient.post<register>(`${this.signupUrl}`, user);
  }
  loginUser(user: register): Observable<register>{
    return this.httpClient.post<register>(`${this.loginUrl}`, user);
  }
  profile(user: register): Observable<register> {
    return this.httpClient.put<register>(`${this.profileUrl}`, user);
  }
  getuserProfile(id: string):Observable<register> {
    return this.httpClient.get<register>(`${this.getuserProfileUrl}/${id}`);
  }
}
