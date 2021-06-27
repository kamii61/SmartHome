import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { RoomReducer } from '../redux/Reducers/RoomReducer';
import { ItemReducer } from '../redux/Reducers/ItemReducer';
import { ClientReducer } from '../redux/Reducers/ClientReducer';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
  RoomReducer,
  ItemReducer,
  ClientReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
