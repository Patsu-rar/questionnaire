import {createSelector} from '@ngrx/store';

export const selectAssessmentsState = (state: any) => state;

export const selectAssessmentsList = createSelector(
  selectAssessmentsState,
  state => {
    return {
      assessmentsList: state.assessments.assessmentsList,
      loading: state.assessments.loading
    }
  }
)
