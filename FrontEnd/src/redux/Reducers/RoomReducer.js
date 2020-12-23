let defaultState = {
  roomList: [{ room_name: "living room" }, { room_name: "bed room" }],
  roomEdit: [],
  roomRedux: {
    values: {},
  },
};

const RoomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_ROOM": {
      state.roomList = action.payload;
      return { ...state };
    }

    case "SET_ROOM_REDUX": {
      state.roomRedux = action.roomRedux;
      return { ...state };
    }

    case "ADD_ROOM": {
      const roomListUpdate = [...state.roomList, action.payload];
      return { roomList: roomListUpdate, ...state };
    }

    case "DELETE_ROOM": {
      let roomUpdate = [...state.roomList];

      roomUpdate = roomUpdate.filter((room) => room.room_id !== action.room_id);
      console.log("room update", roomUpdate);
      // cap nhat lai state roomList
      state.roomList = roomUpdate;
      return { ...state };
    }

    case "EDIT_ROOM": {
      //cap nhat la state
      state.roomEdit = { ...action.payload };
      console.log("edit room", state.roomEdit);

      let newRoomRedux = { ...state.roomRedux };
      newRoomRedux.values = { ...action.payload };

      return { ...state, roomRedux: newRoomRedux };
    }
    default:
      return state;
  }
};

export default RoomReducer;
