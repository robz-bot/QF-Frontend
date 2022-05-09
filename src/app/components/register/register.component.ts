import { ReturnStatement } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { register } from "./register";
import { RegisterService } from "./register.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private toaster: ToasterService,
    private registerService: RegisterService,
    private spinner: NgxSpinnerService
  ) {}
  registerForm!: FormGroup;
  registerValue: register = new register();
  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      cpassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  resData: any;
  onSubmit() {
    this.spinner.show();
    this.registerValue = this.registerForm.value;
    if (this.registerValue.password != this.registerValue.cpassword) {
      this.toaster.showFailure("Password doesn't match");
      this.spinner.hide();
      return;
    }
    try {
      this.registerService
        .registerNewUser(this.registerValue)
        .subscribe((data) => {
          this.resData = data;
          this.spinner.hide();
          if (this.resData.success) {
            this.registerForm.reset();
            this.toaster.showSuccess(this.resData.message);
          } else {
            this.toaster.showFailure(this.resData.message);
          }
        });
    } catch (err) {
      this.toaster.showCatchErr(err);
    }
  }
}
