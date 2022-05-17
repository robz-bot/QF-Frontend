import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl } from "src/app/common";
import { report } from "./report";
import { vote } from "./vote";
@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}
  SUB_URL: string = "api/report/";
  //Report URL
  
  private newReportUrl =
    baseUrl.BASE_URL + this.SUB_URL + "newReport";

    newReport(report: report): Observable<Object> {
    return this.httpClient.post(`${this.newReportUrl}`, report);
  }
 
}
