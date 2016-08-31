export const SET_PLATFORM = 'SET_PLATFORM';
export const TOGGLE_CONNECTION_STATUS = 'TOGGLE_CONNECTION_STATUS';

export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    payload: { platform }
  };
}

export function toggleConnectionStatus(isConnected = true) {
  return {
    type: TOGGLE_CONNECTION_STATUS,
    payload: { isConnected },
  };
}
