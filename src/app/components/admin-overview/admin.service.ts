import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { widget } from "./admin";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  private BASEURL: string = "api/admin/";
  //Admin URL

  private widgetsUrl = baseUrl.BASE_URL + this.BASEURL + "widgets/";

  widgets() {
    return this.httpClient.get<widget>(`${this.widgetsUrl}`);
  }
}
