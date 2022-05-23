import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/shared-components/toaster-component/toasterService.service";
import { RegisterService } from "../register/register.service";
import { post } from "./post";
import { PostService } from "./post.service";
import { report } from "./report";
import { ReportService } from "./report.service";
import { ReportTypeService } from "./report_type";
import { searchPost } from "./search-post";
import { vote } from "./vote";
import { VoteService } from "./vote.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  loggedInUserId: string = "";
  @ViewChild('closebutton') closebutton: any;
  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private voteService: VoteService,
    private reportTypeService: ReportTypeService,
    private reportService: ReportService
  ) {}
  reportForm!: FormGroup;
  dateForm!: FormGroup;
  reportValue: report = new report();
  searchValue: searchPost = new searchPost();
  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    //To get AllPosts
    this.getPosts();
    //Initalize the reason form values
    this.reportForm = new FormGroup({
      reportTypeId: new FormControl("", [Validators.required]),
      reason: new FormControl("", [Validators.required]),
    });

    this.dateForm=new FormGroup({
      date: new FormControl("", [Validators.required]),
    })
  }

  postList: post[] = [];
  postListLength: number = 0;
  getPosts() {
    this.spinner.show();
    try {
      this.postService
        .allPostByUserId(this.loggedInUserId,"DESC")
        .subscribe((data) => {
          this.spinner.hide();
          console.log(data);
          this.postList = data;
          this.postListLength = data.length;
        });
    } catch (error) {
      this.spinner.hide();
      this.toaster.showCatchErr(error);
    }
  }
  
  navigateToPost(postId: string) {
    this.router.navigate(["/dashboard/post/", postId]);
  }
  newVote: vote = new vote();
  likedByUser: any;
  postLikedByUser(item: post) {
    this.newVote.postId = item.id;
    this.newVote.userId = this.loggedInUserId;
    this.newVote.voteType = "UPVOTE";
    this.voteService.postLikedByUser(this.newVote).subscribe((data) => {
      console.log(data);
      this.likedByUser = data;
      this.getPosts();
    });
  }
  dislikedByUser: any;
  postDisLikedByUser(item: post) {
    this.newVote.postId = item.id;
    this.newVote.userId = this.loggedInUserId;
    this.newVote.voteType = "DOWNVOTE";
    this.voteService.postLikedByUser(this.newVote).subscribe((data) => {
      console.log(data);
      this.dislikedByUser = data;
      this.getPosts();
    });
  }

  onSubmitReport() {
    this.spinner.show();
    this.reportValue = this.reportForm.value;
    this.reportValue.postId = this.reportedItem.id
    this.reportValue.userId = this.loggedInUserId
    console.log(this.reportValue);
    try {
      this.reportService.newReport(this.reportValue).subscribe((data) => {
        console.log(data);
        this.spinner.hide(); 
        this.reportForm.reset();
        this.closebutton.nativeElement.click();
        this.getPosts()
      });
    } catch (err) {}
  }

  reportTypeList: report[] = [];
  reportedItem:post=new post()
  getAllReportsType(item:post) {
    this.reportTypeService.allReportsType().subscribe((data) => {
      this.reportTypeList = data;
      this.reportedItem=item
      console.log(data);
      
    });
  }

  onSubmitSearch(type:string){
    console.log(type)
    if(type=="ASC"){
      this.postService
        .allPostByUserId(this.loggedInUserId,"ASC")
        .subscribe((data) => {
          this.spinner.hide();
          console.log(data);
          this.postList = data.reverse();
          this.postListLength = data.length;
        });
    }else if(type=="DESC"){
      this.postService
      .allPostByUserId(this.loggedInUserId,"DESC")
      .subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.postList = data.reverse();
        this.postListLength = data.length;
      });
    }
  }

  todayDate:string = new Date().toISOString().split("T")[0]
  onSubmitDate(){
    console.log(this.dateForm.value)
    this.spinner.show();
    try {
      this.postService
        .getSearchPostDate(this.dateForm.value.date)
        .subscribe((data) => {
          this.spinner.hide();
          console.log(data);
          this.postList = data;
          this.postListLength = data.length;
        });
    } catch (error) {
      this.spinner.hide();
      this.toaster.showCatchErr(error);
    }
  }
}
