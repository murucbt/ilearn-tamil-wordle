import { combineReducers } from 'redux';
import {GamewordReducerState, GameWordListReducer } from './GameWordListReducer'
import { SolutionReducerState, SolutionListReducer} from './SolutionListReducer'

export interface RootState {
  gameWordReducer: GamewordReducerState;
  solutionReducer: SolutionReducerState;
}

const rootReducer = combineReducers({
    GameWordListReducer,
    SolutionListReducer,
});

export default rootReducer;