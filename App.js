import React from "react";
import {AsyncStorage} from "react-native";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {autoRehydrate, persistStore} from "redux-persist";
import IceFrixTabNav from "./IceFrixTabNav";
import {boxes} from "./reducers";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            store: null,
            isLoading: true,
        };
    }


    componentWillMount() {
        let reducer = boxes;
        /*combineReducers({
            ...iceFrixApp,
        }); */

        let store = createStore(reducer, {}, compose(applyMiddleware(logger, thunk), autoRehydrate({log: true})));
        let persistor = persistStore(store, {
            storage: AsyncStorage,
        }, () => this.setState({isLoading: false}));


        this.setState({store, persistor});

    }

    render() {

        if (this.state.isLoading) {
            return null;
        }


        return (
            <Provider store={this.state.store} persistor={this.state.persistor}>
                <IceFrixTabNav />
            </Provider>
        );
    }
};
