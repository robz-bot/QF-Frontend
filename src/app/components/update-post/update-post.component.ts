import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'src/app/shared-components/toaster-component/toasterService.service';
import { post } from '../posts/post';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  constructor(
    private toaster: ToasterService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private aroute:ActivatedRoute,
  ) {}

  updatePostForm!: FormGroup;
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
  postId:string=""
  getDataById:post=new post()
  ngOnInit() {
    this.loggedInUserId = JSON.parse(sessionStorage.getItem("userId")!);
    this.postId = this.aroute.snapshot.params['id'];

    this.postService.getPostById(this.postId).subscribe(data => {
      console.log(data)
      this.getDataById = data;
      
      this.updatePostForm.setValue({
        description: data.description,});
    })

    this.updatePostForm = new FormGroup({
      description: new FormControl("", [Validators.required]),
    });
  }
  resData: any;
  updatePostValue: post = new post();
  onSubmit() {
    this.spinner.show();
    this.updatePostValue = this.updatePostForm.value;
    this.updatePostValue.userId = this.loggedInUserId;
    this.updatePostValue.id=this.postId
    this.updatePostValue.createdOn=this.getDataById.createdOn;
    try {
      this.postService.updatePost(this.updatePostValue).subscribe((data) => {
        this.resData = data;
        this.spinner.hide();
        if (this.resData.success) {
          this.updatePostForm.reset();
          this.toaster.showSuccess(this.resData.message);
          this.router.navigateByUrl("/dashboard/my-post");
        } else {
          this.toaster.showFailure(this.resData.message);
        }
      });
    } catch (err) {
      this.toaster.showCatchErr(err);
    }
  }
}
