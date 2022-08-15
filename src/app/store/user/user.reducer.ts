import { Action, createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import {User} from "../../shared/models/User";

export interface IUserState {
  user: User | null;
  loading: boolean;
  error: string;
}

export const initialState: IUserState = {
  user: null,
  loading: false,
  error: ''
}

export function userReducer(state: IUserState | undefined, action: Action) {
  return reducer(state, action);
}

const reducer = createReducer<IUserState>(
  initialState,

  on(userActions.userSignup, state => ({
    ...state,
    user: null,
    loading: true,
    error: ''
  })),
  on(userActions.userSignupSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false
  })),
  on(userActions.userSignupFailure, state => ({
    ...state,
    error: 'Invalid credentials',
    loading: false
  })),

  on(userActions.userLogin, state => ({
    ...state,
    user: null,
    loading: true,
    error: ''
  })),
  on(userActions.userLoginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false
  })),
  on(userActions.userLoginFailure, state => ({
    ...state,
    error: 'Invalid email or password',
    loading: false
  })),

  on(userActions.userLogout, state => ({
    ...state,
    user: null
  }))
)
