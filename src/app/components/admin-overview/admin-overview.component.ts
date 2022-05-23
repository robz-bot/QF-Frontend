import { Component, OnInit } from "@angular/core";
import { AdminService } from "./admin.service";
import {widget} from "./admin"
@Component({
  selector: "app-admin-overview",
  templateUrl: "./admin-overview.component.html",
  styleUrls: ["./admin-overview.component.css"],
})
export class AdminOverviewComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.widgets();
  }

  widgetData:widget = new widget()
  widgets(): void {
    this.adminService.widgets().subscribe((data) => {
      console.log(data);
      this.widgetData = data;
    });
  }
}
