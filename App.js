import React from "react";
import {AsyncStorage, View, ActivityIndicator, Text} from "react-native";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {autoRehydrate, persistStore, persistReducer} from "redux-persist";
import IceFrixTabNav from "./IceFrixTabNav";
import {boxesReducer} from "./reducers";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const logger = createLogger({predicate: (getState, action) => __DEV__});

const Loading = () => (
  <View>
    <ActivityIndicator />
    <Text>Initializing...</Text>
  </View>
);


export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            store: null,
            isLoading: true,
        };
    }


    componentWillMount() {
        let reducer = combineReducers({
            ...boxesReducer,
        });

        const persistConfig = {
          key: 'root',
          storage,
        }

        const persistedReducer = persistReducer(persistConfig, reducer)

        let store = createStore(persistedReducer); //reducer, Data, compose(applyMiddleware(logger, thunk)));//, autoRehydrate({log: true})));
        let persistor = persistStore(store); //, null, () => this.setState({isLoading: false}));

        this.setState({store, persistor});
    }

    render() {
        return (
          <Provider store={this.state.store}>
            <PersistGate loading={<Loading />} persistor={this.state.persistor}>
                <IceFrixTabNav />
            </PersistGate>
          </Provider>
        );
    }
};
