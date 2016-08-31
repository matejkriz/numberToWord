import App from './app/App.react';
import configureStore from './configureStore';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export default function index() {
    const initialState = {
        config: {
          appName: require('../package.json').name,
        }
    };

    const store = configureStore({ createEngine, initialState });

    class Root extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }

    AppRegistry.registerComponent('NumberToWord', () => Root);
}
