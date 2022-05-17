import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
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

  myPostList: any;
  myPostListCount:number=0;

  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.getMyPosts();
  }
  getMyPosts() {
    this.spinner.show();
    try {
      this.postService.getUserPost(this.loggedInUserId).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.myPostList = data;
        this.myPostListCount=this.myPostList.length
      });
    } catch (error) {
      this.toaster.showCatchErr(error);
    }
  }
  navigateToPost(postId: number) {
    this.router.navigate(["/dashboard/post/", postId]);
  }
}
