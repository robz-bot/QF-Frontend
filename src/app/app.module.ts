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
