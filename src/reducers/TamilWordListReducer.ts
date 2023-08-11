
// Define action types
export enum TamilWordActionTypes {
  SET_DATA = 'SET_DATA',
}

// Define action interfaces
interface SetDataAction {
  type: TamilWordActionTypes.SET_DATA;
  payload: {threeWordList: string[], fourWordList: string[], fiveWordList: string[]};
}

type YourReducerActions = SetDataAction;

// Define state interface
export interface TamilwordReducerState {
  data: string;
  threeWordList: string[];
  fourWordList: string[];
  fiveWordList: string[];
}

// Define initial state
const initialState: TamilwordReducerState = {
  data: '',
  threeWordList: [],
  fourWordList: [],
  fiveWordList: [],
};

// Create the reducer
export const TamilWordListReducer = (
  state = initialState,
  action: YourReducerActions
): TamilwordReducerState => {
  switch (action.type) {
    case TamilWordActionTypes.SET_DATA:
      return {...state, threeWordList: action.payload.threeWordList, fourWordList: action.payload.fourWordList, fiveWordList: action.payload.fiveWordList};
    default:
      return state;
  }
};

export default TamilWordListReducer;
