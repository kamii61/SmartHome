let defaultState = {
  roomList: [{ room_name: "living room" }, { room_name: "bed room" }],
  roomEdit: [],
  roomRedux: {
    values: {},
  },
};

export const RoomReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Get data from server and load data to UI
    case "FETCH_ROOM": {
      console.log(action.payload);
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

    case "GET_ROOM_ID": {
      //cap nhat la state
      state.roomEdit = { ...action.payload };

      let newRoomRedux = { ...state.roomRedux };
      newRoomRedux.values = { ...action.payload };

      return { ...state, roomRedux: newRoomRedux };
    }

    case "UPDATE_ROOM": {
      console.log("update room", action.payload);
      return { ...state };
    }
    default:
      return state;
  }
};
