import { createSelector } from "@ngrx/store";

export const selectUserInfoState = (state: any) => state;

export const selectUser = createSelector(
  selectUserInfoState,
  state => {
    return {
      user: state.user.user,
      loading: state.user.loading
    }
  }
)
