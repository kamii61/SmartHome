let defaultState = {
  roomList: [],
  roomEdit: [],
  roomRedux: {
    values: {},
  },
};

export const RoomReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Get data from server and load data to UI
    case 'FETCH_ROOM': {
      state.roomList = action.payload;
      return { ...state };
    }

    case 'SET_ROOM_REDUX': {
      state.roomRedux = action.roomRedux;
      return { ...state };
    }

    case 'ADD_ROOM': {
      const roomListUpdate = [...state.roomList, action.payload];
      return { roomList: roomListUpdate, ...state };
    }

    case 'DELETE_ROOM': {
      let roomUpdate = [...state.roomList];

      roomUpdate = roomUpdate.filter((room) => room.room_id !== action.room_id);
      // update state roomList
      state.roomList = roomUpdate;
      return { ...state };
    }

    case 'GET_ROOM_ID': {
      //update state
      state.roomEdit = { ...action.payload };

      let newRoomRedux = { ...state.roomRedux };
      newRoomRedux.values = { ...action.payload };

      return { ...state, roomRedux: newRoomRedux };
    }

    case 'UPDATE_ROOM': {
      const roomListUpdate = [...state.roomList];
      let roomUpdate = roomListUpdate.find((r) => {
        return r.room_id === state.roomRedux.values.room_id;
      });

      if (roomUpdate) {
        roomUpdate.room_id = state.roomRedux.values.room_id;
        roomUpdate.room_name = state.roomRedux.values.room_name;
        roomUpdate.room_image = state.roomRedux.values.room_image;
      }

      state.roomList = roomListUpdate;

      return { ...state };
    }
    default:
      return state;
  }
};
