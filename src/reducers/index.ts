import { combineReducers } from 'redux';
import {TamilwordReducerState, TamilWordListReducer } from './TamilWordListReducer'
import { SolutionReducerState, SolutionListReducer} from './SolutionListReducer'

export interface RootState {
  tamilWordReducer: TamilwordReducerState;
  solutionReducer: SolutionReducerState;
  // Add other reducers here if needed
}

const rootReducer = combineReducers({
    TamilWordListReducer,
    SolutionListReducer,
  // Add other reducers here if needed
});

export default rootReducer;