import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { RegisterService } from "../register/register.service";
import { post } from "./post";
import { PostService } from "./post.service";
import { vote } from "./vote";
import { VoteService } from "./vote.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  loggedInUserId: string = "";
  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private voteService: VoteService
  ) {}

  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.getPosts();
    
  }

  postList: any[]=[];
  postListLength:number=0;
  getPosts() {
    this.spinner.show();
    try {
      this.postService.allPostByUserId(this.loggedInUserId).subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.postList = data;
        this.postListLength=data.length;
      });
    } catch (error) {
      this.toaster.showCatchErr(error);
    }
  }
  navigateToPost(postId: number) {
    this.router.navigate(["/dashboard/post/", postId]);
  }
  newVote: vote = new vote();
  likedByUser:any
  postLikedByUser(item: post) {
    this.newVote.postId = item.id;
    this.newVote.userId = this.loggedInUserId;
    this.newVote.voteType = "UPVOTE";
    this.voteService.postLikedByUser(this.newVote).subscribe((data) => {
      console.log(data);
      this.likedByUser=data;
      this.getPosts()
    });
    
  }
  dislikedByUser:any
  postDisLikedByUser(item: post) {
    this.newVote.postId = item.id;
    this.newVote.userId = this.loggedInUserId;
    this.newVote.voteType = "DOWNVOTE";
    this.voteService.postLikedByUser(this.newVote).subscribe((data) => {
      console.log(data);
      this.dislikedByUser=data;this.getPosts()
    });
  }
 

}
