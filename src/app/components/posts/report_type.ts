import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { report } from "./report";
import { vote } from "./vote";
@Injectable({
  providedIn: "root",
})
export class ReportTypeService {
  constructor(private httpClient: HttpClient) {}
  SUB_URL: string = "api/report_type/";
  //Report Type URL
  
  private allReportsTypeUrl =
    baseUrl.BASE_URL + this.SUB_URL + "";

    allReportsType():Observable<report[]> {
    return this.httpClient.get<report[]>(`${this.allReportsTypeUrl}`);
  }
 
}
