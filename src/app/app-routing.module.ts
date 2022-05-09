import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { MyPostsComponent } from "./components/my-posts/my-posts.component";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { PostCommentComponent } from "./components/post-comment/post-comment.component";
import { PostsComponent } from "./components/posts/posts.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: PostsComponent,
      },
      {
        path: "post",
        component: NewPostComponent,
      },
      {
        path: "post/:id",
        component: PostCommentComponent,
      },
      {
        path: "my-post",
        component: MyPostsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
