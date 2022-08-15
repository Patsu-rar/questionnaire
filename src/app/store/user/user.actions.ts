import {createAction, props} from '@ngrx/store';

import {User} from "../../shared/models/User";

export const userSignup = createAction('[User] Sign Up User', props<{
  user: {
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }
}>());
export const userSignupSuccess = createAction('[User] Sign Up User Success', props<{ user: User }>());
export const userSignupFailure = createAction('[User] Sign Up User Failure');

export const userLogin = createAction('[User] Sign In User', props<{ email: string, password: string }>());
export const userLoginSuccess = createAction('[User] Sign In User Success', props<{ user: User }>());
export const userLoginFailure = createAction('[User] Sign In User Failure');

export const userLogout = createAction('[User] Sign Out User');
export const userLogoutSuccess = createAction('[User] Sign Up User Success');
export const userLogoutFailure = createAction('[User] Sign Up User Failure');



