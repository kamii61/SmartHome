import { combineReducers, createStore } from "redux";
import { RoomReducer } from "../redux/Reducers/RoomReducer";

const RootReducer = combineReducers({
  RoomReducer,
});

export const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
