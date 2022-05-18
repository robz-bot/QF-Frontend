import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { post } from "../posts/post";
import { PostService } from "../posts/post.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"],
})
export class NewPostComponent implements OnInit {
  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  newPostForm!: FormGroup;
  controls = {
    height: 300,
    menubar: false,
    // plugins: [
    //   "advlist autolink lists link image charmap print",
    //   "searchreplace visualblocks code fullscreen",
    //   "insertdatetime media table paste code help word anchor autoresize autosave fullscreen preview",
    // ],
    autosave_interval: "20s",
    toolbar:
      "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | nullist numlist | outdend | indent | removeformat | anchor | fullscreen | preview",
  };

  loggedInUserId: string = "";
  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.newPostForm = new FormGroup({
      description: new FormControl("", [Validators.required]),
    });
  }
  resData: any;
  newPostValue: post = new post();
  onSubmit() {
    this.spinner.show();
    this.newPostValue = this.newPostForm.value;
    this.newPostValue.userId = this.loggedInUserId;

    try {
      this.postService.newPost(this.newPostValue).subscribe((data) => {
        this.resData = data;
        this.spinner.hide();
        if (this.resData.success) {
          this.newPostForm.reset();
          this.toaster.showSuccess(this.resData.message);
          this.router.navigateByUrl("/dashboard");
        } else {
          this.toaster.showFailure(this.resData.message);
        }
      });
    } catch (err) {
      this.toaster.showCatchErr(err);
    }
  }

 
}
