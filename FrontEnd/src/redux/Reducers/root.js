import { combineReducers } from "redux";
import RoomReducer from "./RoomReducer";

const RootReducer = combineReducers({
  room: RoomReducer,
});

export default RootReducer;
