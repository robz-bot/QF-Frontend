import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { register } from "../register/register";
import { RegisterService } from "../register/register.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private toaster: ToasterService,
    private registerService: RegisterService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}
  loginForm!: FormGroup;  
  loginValue: register = new register();
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  resData: any;
  onSubmit() {
    this.spinner.show();
    this.loginValue = this.loginForm.value;

    try {
      this.registerService.loginUser(this.loginValue).subscribe((data) => {
        this.resData = data;
        this.spinner.hide();
        console.log(this.resData);
        if (this.resData.success) {
          sessionStorage.setItem("userId", this.resData.userId);
          this.loginForm.reset();
          this.toaster.showSuccess(this.resData.message);
          this.route.navigateByUrl("/dashboard");
        } else {
          this.toaster.showFailure(this.resData.message);
        }
      });
    } catch (err) {
      this.toaster.showCatchErr(err);
    }
  }
}
