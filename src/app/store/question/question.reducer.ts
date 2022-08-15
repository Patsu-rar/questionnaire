import { Action, createReducer, on } from "@ngrx/store";

import * as questionActions from './question.actions';
import {Question} from "../../shared/models/question";

export interface IQuestionState {
  question: Question | null,
  loading: boolean
}

export const initialState: IQuestionState = {
  question: null,
  loading: false
}

export function questionReducer(state: IQuestionState | undefined, action: Action) {
  return reducer(state, action);
}

const reducer = createReducer<IQuestionState>(
  initialState,

  on(questionActions.CreateQuestion, state => ({
    ...state,
    question: null,
    loading: true
  })),
  on(questionActions.CreateQuestionSuccess, (state, { question }) => ({
    ...state,
    question: question,
    loading: false
  })),
  on(questionActions.CreateQuestionFailure, state => ({
    ...state,
    loading: false
  })),

  on(questionActions.LoadQuestion, state => ({
    ...state,
    loading: true
  })),
  on(questionActions.LoadQuestionSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(questionActions.LoadQuestionFailure, state => ({
    ...state,
    loading: false
  })),

  on(questionActions.DeleteQuestion, state => ({
    ...state,
    loading: true
  })),
  on(questionActions.DeleteQuestionSuccess, (state, { question }) => ({
    ...state,
    question: question,
    loading: false
  })),
  on(questionActions.DeleteQuestionFailure, state => ({
    ...state,
    loading: false
  })),
)
