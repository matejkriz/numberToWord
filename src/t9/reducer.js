import * as actions from './actions';
import Immutable, {List, Record} from 'immutable';

const InitialState = Record({
  error: false,
  isFetching: false,
  number: '',
  wordList: List(),
});
const initialState = new InitialState;

export default function t9Reducer(state = initialState, action) {

  switch (action.type) {

    case actions.ERROR_RESET:
      {
        return state
          .set('error', false);
      }

    case actions.FETCH_WORD_LIST_START:
      {
        return state
          .set('isFetching', true)
          .set('error', false);
      }

    case actions.FETCH_WORD_LIST_SUCCESS:
      {
        return state
          .set('isFetching', false)
          .set('error', false)
          .set('wordList', List.of(...action.payload));
      }

    case actions.FETCH_WORD_LIST_ERROR:
      {
        return state
          .set('isFetching', false)
          .set('error', action.payload);
      }
    case actions.SET_NUMBER:
      {
        return state
          .set('number', action.payload.number);
      }
  }
  return state;
}
