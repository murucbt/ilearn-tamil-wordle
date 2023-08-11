
// Define action types
export enum SolutionActionTypes {
  GET_SOLUTION_DATA = 'GET_SOLUTION_DATA',
}

// Define action interfaces
interface SetDataAction {
  type: SolutionActionTypes.GET_SOLUTION_DATA;
  payload: {previousdayWord: string, solution: string, solutionGameDate: Date, solutionIndex: Number, tomorrow: Number};
}

type SolutionReducerActions = SetDataAction;

// Define state interface
export interface SolutionReducerState {
    previousdayWord: string,
    solution: string; 
    solutionGameDate: Date;
    solutionIndex: Number;
    tomorrow: Number;
}

// Define initial state
const initialState: SolutionReducerState = {
    previousdayWord: '',
    solution: '', 
    solutionGameDate: new Date(),
    solutionIndex: 0,
    tomorrow: 0,
};

// Create the reducer
export const SolutionListReducer = (
  state = initialState,
  action: SolutionReducerActions
): SolutionReducerState => {
  switch (action.type) {
    case SolutionActionTypes.GET_SOLUTION_DATA:
      return {...state, previousdayWord: action.payload.previousdayWord, solution: action.payload.solution, solutionGameDate: action.payload.solutionGameDate, solutionIndex: action.payload.solutionIndex, tomorrow: action.payload.tomorrow};
    default:
      return state;
  }
};

export default SolutionListReducer;
