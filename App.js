import React from "react";
import {AsyncStorage} from "react-native";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {autoRehydrate, persistStore} from "redux-persist";
import IceFrixTabNav from "./IceFrixTabNav";
import {boxesReducer} from "./reducers";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import Data from './ressources/Data.json';

const logger = createLogger({predicate: (getState, action) => __DEV__});

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

        let store = createStore(reducer, Data, compose(applyMiddleware(logger, thunk)));//, autoRehydrate({log: true})));
        let persistor = persistStore(store, null, () => this.setState({isLoading: false}));


        this.setState({store, persistor});

    }

    render() {
        return (
            <Provider store={this.state.store} persistor={this.state.persistor}>
                <IceFrixTabNav />
            </Provider>
        );
    }
};
