import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from "./shared-components/header/header.component";
import { PostsComponent } from "./components/posts/posts.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostCommentComponent } from "./components/post-comment/post-comment.component";
import { EditorModule } from "@tinymce/tinymce-angular";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { MyPostsComponent } from "./components/my-posts/my-posts.component";
import { ProfileComponent } from './components/profile/profile.component';
import { PostReportComponent } from './components/post-report/post-report.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PostsComponent,
    DashboardComponent,
    PostCommentComponent,
    NewPostComponent,
    MyPostsComponent,
    ProfileComponent,
    PostReportComponent,
    UpdatePostComponent,
    AdminDashboardComponent,
    AdminOverviewComponent,
    AdminPostsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
