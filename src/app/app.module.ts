import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionManagementComponent} from './pages/question-management/question-management.component';
import {CreateQuestionComponent} from './pages/create-question/create-question.component';
import {EditQuestionComponent} from './pages/edit-question/edit-question.component';
import {QuestionListComponent} from './pages/question-list/question-list.component';
import {LoginComponent} from './pages/login/login.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    QuestionListComponent,
    LoginComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
