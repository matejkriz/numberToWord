import URI from 'urijs';

function ensureServerUrl(serverUrl, input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI(serverUrl + input).normalize().toString();
}

export default function createFetch(serverUrl) {
  return (input, init) => {
    input = ensureServerUrl(serverUrl, input);

    init = init || {};
    
    console.log("fetch: ", input, init);
    return fetch(input, init);
  };
}
