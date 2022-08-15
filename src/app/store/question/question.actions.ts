import {createAction, props} from '@ngrx/store';
import {Question} from "../../shared/models/question";

export const CreateQuestion = createAction('[Question] Create Question',
  props<{ question: Question}>());
export const CreateQuestionSuccess = createAction('[Question] Create Question Success',
  props<{ question: Question }>());
export const CreateQuestionFailure = createAction('[Question] Create Question Failure');

export const LoadQuestion = createAction('[Question] Load Question');
export const LoadQuestionSuccess = createAction('[Question] Load Question Success');
export const LoadQuestionFailure = createAction('[Question] Load Question Failure');

export const DeleteQuestion = createAction('[Question] Delete Question');
export const DeleteQuestionSuccess = createAction('[Question] Delete Question Success',
  props<{ question: Question }>());
export const DeleteQuestionFailure = createAction('[Question] Delete Question Failure');
