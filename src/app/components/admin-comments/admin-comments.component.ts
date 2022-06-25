import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'src/app/shared-components/toaster-component/toasterService.service';
import { comment } from '../post-comment/comment';

import { CommentService } from '../post-comment/comment.service';
import { ReportService } from '../posts/report.service';
import { ReportTypeService } from '../posts/report_type';
import { VoteService } from '../posts/vote.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  loggedInUserId: string = "";
  @ViewChild('deleteHide')closePopover:any;
  constructor(
    private toaster: ToasterService,
    private commentService: CommentService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private voteService: VoteService,
    private reportTypeService: ReportTypeService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    //To get Allcomments
    this.getcomments();
  }
  commentList: comment[] = [];
  commentListLength: number = 0;
  spinnerMsg:string=""
  getcomments() {
    this.spinnerMsg="Fetching comment(s)..."
    this.spinner.show();
    try {
      this.commentService.allComments().subscribe((data) => {
        this.spinner.hide();
        console.log(data);
        this.commentList = data;
        this.commentListLength = data.length;
      });
    } catch (error) {
      this.spinner.hide();
      this.toaster.showCatchErr(error);
    }
  }
  resData:comment=new comment()
  deletecomment(item: comment) {
    this.spinnerMsg="Deleting comment..."
    console.log(item);
    this.spinner.show();
    this.commentService.deleteComment(item.id).subscribe(data=>{
      console.log(data);
      this.resData=data;
      this.toaster.showSuccess(this.resData.message);
      this.getcomments() 
      this.spinner.hide();
      this.closePopover.hide()
    })
  }
}
