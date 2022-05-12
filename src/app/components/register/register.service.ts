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

  //Auth URL
  private signupUrl = baseUrl.BASE_URL + "api/auth/signup";
  private loginUrl = baseUrl.BASE_URL + "api/auth/login";

  registerNewUser(user: register): Observable<Object> {
    return this.httpClient.post(`${this.signupUrl}`, user);
  }
  loginUser(user: register): Observable<Object> {
    return this.httpClient.post(`${this.loginUrl}`, user);
  }
}
