import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { post } from "../posts/post";
import { PostService } from "../posts/post.service";

@Component({
  selector: "app-my-posts",
  templateUrl: "./my-posts.component.html",
  styleUrls: ["./my-posts.component.css"],
})
export class MyPostsComponent implements OnInit {
  loggedInUserId: number = 0;

  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  @ViewChild('closeDeleteButton') closebutton: any;
  myPostList: any;
  myPostListCount: number = 0;
  deletePostForm!: FormGroup;
  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.getMyPosts();
    this.deletePostForm = new FormGroup({
      deleteStatement: new FormControl("", [
        Validators.required,
        Validators.pattern("DELETE MY POST"),
      ]),
    });
  }
  getMyPosts() {
    this.spinner.show();
    try {
      this.postService.getUserPost(this.loggedInUserId).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.myPostList = data;
        this.myPostListCount = this.myPostList.length;
      });
    } catch (error) {
      this.toaster.showCatchErr(error);
    }
  }
  navigateToPost(postId: number) {
    this.router.navigate(["/dashboard/post/", postId]);
  }
  getPostItem: post = new post();
  getDeleteItem(item: post) {
    this.getPostItem = item;
  }
  onSubmitDelete() {
    this.spinner.show(); 
    this.postService.deletePost(this.getPostItem.id).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.toaster.showSuccess(data.message);
        this.spinner.hide(); 
        this.deletePostForm.reset();
        this.closebutton.nativeElement.click();
        this.getMyPosts()
      }
    });
  }
}
