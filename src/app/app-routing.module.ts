import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {QuestionListComponent} from "./pages/question-list/question-list.component";
import {EditQuestionComponent} from "./pages/edit-question/edit-question.component";
import {QuestionManagementComponent} from "./pages/question-management/question-management.component";
import {CreateQuestionComponent} from "./pages/create-question/create-question.component";
import {SignupComponent} from "./pages/signup/signup.component";

const appRoutes: Routes = [
  { path: "", component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "management", component: QuestionManagementComponent, canActivate: [AuthGuard] },
  { path: "create", component: CreateQuestionComponent, canActivate: [AuthGuard] },
  { path: "edit", component: EditQuestionComponent, canActivate: [AuthGuard] },
  { path: "list", component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: "**", component: QuestionListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
