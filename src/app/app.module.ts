import {forwardRef, NgModule} from '@angular/core';
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
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {SignupComponent} from './pages/signup/signup.component';
import {StoreModule} from "@ngrx/store";
import {UserEffects, userReducer} from "./store/user";
import {QuestionEffects, questionReducer} from "./store/question";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    QuestionListComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularFirestoreModule,
    StoreModule.forRoot({
      user: userReducer,
      assessments: questionReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([
      UserEffects,
      QuestionEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => QuestionListComponent),
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
