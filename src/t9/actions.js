import * as apiUtils from '../apiUtils';

export const ERROR_RESET = 'ERROR_RESET';

export const FETCH_WORD_LIST_ERROR = 'FETCH_WORD_LIST_ERROR';
export const FETCH_WORD_LIST_START = 'FETCH_WORD_LIST_START';
export const FETCH_WORD_LIST_SUCCESS = 'FETCH_WORD_LIST_SUCCESS';

export const SET_NUMBER = 'SET_NUMBER';

export function errorReset() {
  return {
    type: ERROR_RESET,
    payload: {},
  };
}

export function getWords(number) {
  return ({ fetch }) => ({
    type: 'FETCH_WORD_LIST',
    payload: {
      promise: fetch(`/t9?number=${number}`)
        .then(apiUtils.checkStatus)
        .then(apiUtils.parseJSON)
        .then(data => {
          return data;
        })
        .catch(apiUtils.catchError)
    }
  });
}

export function setNumber(number = '') {
  return {
    type: SET_NUMBER,
    payload: {
      number: number
    },
  };
}
