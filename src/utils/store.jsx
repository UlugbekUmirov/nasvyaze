import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const store = (initialState) => {
    const middleware = [thunkMiddleware];
    return createStore(reducers, initialState, applyMiddleware(...middleware));
}
export default store;