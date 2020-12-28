import { combineReducers, createStore, applyMiddleware } from "redux";
import { RoomReducer } from "../redux/Reducers/RoomReducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  RoomReducer,
});

export const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk))
);
