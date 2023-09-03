
// Define action types
export enum GameWordActionTypes {
    SET_GAME_WORD_DATA = 'SET_GAME_WORD_DATA',
  }
  
  // Define action interfaces
  interface SetDataAction {
    type: GameWordActionTypes.SET_GAME_WORD_DATA;
    payload: {gameWordList: any[]};
  }
  
  type YourReducerActions = SetDataAction;
  
  // Define state interface
  export interface GamewordReducerState {
    gameWordList: any[];
  }
  
  // Define initial state
  const initialState: GamewordReducerState = {
    gameWordList: [],
  };
  
  // Create the reducer
  export const GameWordListReducer = (
    state = initialState,
    action: YourReducerActions
  ): GamewordReducerState => {
    switch (action.type) {
      case GameWordActionTypes.SET_GAME_WORD_DATA:
        return {...state, gameWordList: action.payload.gameWordList};
      default:
        return state;
    }
  };
  
  export default GameWordListReducer;
  