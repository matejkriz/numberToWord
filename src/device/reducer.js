import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  isConnected: true,
  platform: '',
  host: ''
});
const initialState = new InitialState;

export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    case actions.SET_PLATFORM: {
      const { platform } = action.payload;
      return state.set('platform', platform);
    }

    case actions.TOGGLE_CONNECTION_STATUS: {
      const { isConnected } = action.payload;
      return state.set('isConnected', isConnected);
    }

  }

  return state;
}
