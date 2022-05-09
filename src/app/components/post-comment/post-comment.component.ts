import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { post } from "../posts/post";
import { PostService } from "../posts/post.service";

@Component({
  selector: "app-post-comment",
  templateUrl: "./post-comment.component.html",
  styleUrls: ["./post-comment.component.css"],
})
export class PostCommentComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private _router: Router,
    private postService: PostService,
    private spinner: NgxSpinnerService
  ) {}
  postId: number = 0;
  postData: any;
  newCommentForm!: FormGroup;
  ngOnInit() {
    this.postId = this.aroute.snapshot.params["id"];
    this.newCommentForm = new FormGroup({
      comment: new FormControl("", [Validators.required]),
    });
    this.spinner.show();
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.postData = data;
        console.log(this.postData);
        this.spinner.hide();
      },
      (error) => console.log(error)
    );
  }
  onSubmit() {}
}
