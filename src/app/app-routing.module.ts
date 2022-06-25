import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminCommentsComponent } from "./components/admin-comments/admin-comments.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminOverviewComponent } from "./components/admin-overview/admin-overview.component";
import { AdminPostsComponent } from "./components/admin-posts/admin-posts.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { MyPostsComponent } from "./components/my-posts/my-posts.component";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { PostCommentComponent } from "./components/post-comment/post-comment.component";
import { PostsComponent } from "./components/posts/posts.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { UpdatePostComponent } from "./components/update-post/update-post.component";

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
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "update-post/:id",
        component: UpdatePostComponent,
      },
    ],
  },
  {
    path:"admin-dashboard",
    component: AdminDashboardComponent,
    children: [
      {
        path: "",
        component: AdminOverviewComponent,
      },
      {
        path: "admin-posts",
        component: AdminPostsComponent,
      },
      {
        path: "admin-comments",
        component: AdminCommentsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
