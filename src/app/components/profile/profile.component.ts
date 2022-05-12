import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { PostService } from "../posts/post.service";
import { register } from "../register/register";
import { RegisterService } from "../register/register.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  loggedInUserId: string = "";
  constructor(
    private toaster: ToasterService,
    private regService: RegisterService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  profileForm!: FormGroup;
  loadingMsg: string = "";
  loadUser: register = new register();

  ngOnInit(): void {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.getProfile();
    const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    this.profileForm = new FormGroup({
      userName: new FormControl(""),
      email: new FormControl(""),
      phoneNumber: new FormControl("", [
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ]),
      designation: new FormControl("", []),
      gender: new FormControl("", []),
      location: new FormControl("", []),
      github: new FormControl("", [Validators.pattern(urlRegex)]),
      linkedIn: new FormControl("", []),
      skills: new FormControl("", []),
      organization: new FormControl("", []),
    });
   
 
  }
  newProfileValue: register = new register();
  resData: register = new register();
  private getProfile() {
    this.loadingMsg = "Loading profile...";
    this.spinner.show();
    this.regService.getuserProfile(this.loggedInUserId).subscribe((data) => {
      console.log(data);
      this.loadUser = data;
      this.getuserProfile();
      this.spinner.hide();
    });
  }

  onSubmit() {
    this.loadingMsg = "Updating profile...";
    console.log(this.profileForm.value);
    this.spinner.show();
    this.newProfileValue = this.profileForm.value;
    this.newProfileValue.id = this.loggedInUserId;

    try {
      this.regService.profile(this.newProfileValue).subscribe((data) => {
        this.resData = data;
        this.spinner.hide();
        if (this.resData.success) {
          this.profileForm.reset();
          this.toaster.showSuccess(this.resData.message);
          this.getProfile();
        } else {
          this.toaster.showFailure(this.resData.message);
        }
      });
    } catch (err) {
      this.toaster.showCatchErr(err);
    }
  }

  getuserProfile() {
    this.profileForm.setValue({
      userName: this.loadUser.userName, 
      email: this.loadUser.email,
      phoneNumber: this.loadUser.phoneNumber,
      designation: this.loadUser.designation,
      skills: this.loadUser.skills,
      gender: this.loadUser.gender,
      organization: this.loadUser.organization,
      location: this.loadUser.location,
      github:this.loadUser.github,
      linkedIn: this.loadUser.linkedIn,
    });
    
  }
}
