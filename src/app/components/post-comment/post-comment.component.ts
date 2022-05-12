import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { post } from "../posts/post";
import { PostService } from "../posts/post.service";
import { comment } from "./comment";
import { CommentService } from "./comment.service";

@Component({
  selector: "app-post-comment",
  templateUrl: "./post-comment.component.html",
  styleUrls: ["./post-comment.component.css"],
})
export class PostCommentComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private spinner: NgxSpinnerService,
    private toaster: ToasterService,
  ) {}
  postId: string = "";
  postData: post=new post();
  loggedInUserId:string="";
  newCommentForm!: FormGroup;
  loadingMsg:string=""
  ngOnInit() {
  
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.postId = this.aroute.snapshot.params["id"]; 
    this.spinner.show();
    this.loadingMsg="Fetching Post and Comments..."
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.postData = data;
        console.log(this.postData);
      },
      (error) => console.log(error)
    );
    this.newCommentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
    });
   
    this.getAllCommentsByPostIds()
  }
  newCommentValue:comment=new comment()
  resData: comment=new comment();
  onSubmit() {
    this.loadingMsg="Saving your Comment..."
    this.spinner.show();
    this.newCommentValue = this.newCommentForm.value;
    this.newCommentValue.userId = this.loggedInUserId;
    this.newCommentValue.postId = this.postId ;

    this.commentService.newComment(this.newCommentValue).subscribe(data=>{
      this.resData = data;
      console.log(data);
      this.spinner.hide();
      if (this.resData.success) {
        this.newCommentForm.reset();
        this.toaster.showSuccess(this.resData.message);
      } else {
        this.toaster.showFailure(this.resData.message);
      }
    })
  }

  comments:comment[]=[]
  getAllCommentsByPostIds(){
    this.loadingMsg="Fetching Post and Comments..."
    this.spinner.show();
    this.commentService.getCommentsByPostId(this.postId).subscribe(data=>{
      console.log(data)
      this.comments=data;
      this.spinner.hide();
    })
  }
}
