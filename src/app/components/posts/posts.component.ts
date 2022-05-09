import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { RegisterService } from "../register/register.service";
import { post } from "./post";
import { PostService } from "./post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  postList: any;
  getPosts() {
    this.spinner.show();
    try {
      this.postService.getPosts().subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.postList = data;
      });
    } catch (error) {
      this.toaster.showCatchErr(error);
    }
  }
  navigateToPost(postId: number) {
    this.router.navigate(["/dashboard/post/", postId]);
  }
}
