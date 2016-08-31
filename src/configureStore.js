import * as storage from 'redux-storage';
import appReducer from './app/reducer';
import createFetch from './createFetch';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import recycle from 'redux-recycle';
import shortid from 'shortid';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux';

// Este dependency injection middleware. So simple that we don't need a lib.
// It's like mixed redux-thunk and redux-inject.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative';

const enableLogger =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER || isReactNative;

const enableDevToolsExtension =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER &&
  window.devToolsExtension;

export default function configureStore(options) {
  const {
    createEngine,
    initialState,
    platformDeps = {},
    platformMiddleware = []
  } = options;

  const engineKey = `redux-storage:${initialState.config.appName}`;
  const engine = createEngine && createEngine(engineKey); // No server engine.

  let reducer = appReducer;

  const middleware = [
    ...platformMiddleware,
    injectMiddleware({
      ...platformDeps,
      engine,
      fetch: createFetch('http://localhost:3000/api/v1'),
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      thunk,
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine, [
      []
    ]);
    decoratedEngine = storageDebounce(decoratedEngine, 300);
    middleware.push(storage.createMiddleware(decoratedEngine, [], []));
  }

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  const createStoreWithMiddleware = enableDevToolsExtension
    ? compose(applyMiddleware(...middleware), window.devToolsExtension())
    : applyMiddleware(...middleware);
  const store = createStoreWithMiddleware(createStore)(reducer, initialState);

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer');
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
