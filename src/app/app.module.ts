import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionManagementComponent } from './pages/question-management/question-management.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { EditQuestionComponent } from './pages/edit-question/edit-question.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    QuestionListComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
