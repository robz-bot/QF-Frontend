import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterService } from "src/app/components/register/register.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,private regService: RegisterService,) {}

  loggedInUserName:string=""
  loggedInUserId:string=""
  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.getProfile();
  }
  private getProfile() {
    this.regService.getuserProfile(this.loggedInUserId).subscribe((data) => {
      console.log(data);
      this.loggedInUserName = data.userName;
    });
  }

  logout() {
    this.router.navigateByUrl("");
    sessionStorage.clear();
  }
}
