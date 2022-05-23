import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'src/app/shared-components/toaster-component/toasterService.service';
import { post } from '../posts/post';
import { PostService } from '../posts/post.service';
import { ReportService } from '../posts/report.service';
import { ReportTypeService } from '../posts/report_type';
import { VoteService } from '../posts/vote.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  loggedInUserId: string="";

  constructor( private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private voteService: VoteService,
    private reportTypeService: ReportTypeService,
    private reportService: ReportService) { }

  ngOnInit(): void {
    //To get AllPosts
    this.getPosts();
  }
  postList: post[] = [];
  postListLength: number = 0;
  getPosts() {
    this.spinner.show();
    try {
      this.postService
        .getPosts()
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
