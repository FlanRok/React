import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './reducers/productReducer';
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  order: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;