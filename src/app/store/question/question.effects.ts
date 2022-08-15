import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, from, map, of, switchMap} from "rxjs";

import { assessmentsActions } from "src/app/store/question"
import {QuestionService} from "../../shared/services/question.service";

@Injectable()
export class QuestionEffects {

  constructor(
    private actions$: Actions,
    private assessmentService: QuestionService
  ) { }

  assessmentsListLoad$ = createEffect(() => this.actions$.pipe(
    ofType(assessmentsActions.CreateQuestion),
    switchMap(() => from(this.assessmentService.getQuestions())
      .pipe(
        map((assessmentsList) => assessmentsActions.CreateQuestionSuccess()),
        catchError(() => of(assessmentsActions.CreateQuestionFailure()))
      ))
  ))
}

