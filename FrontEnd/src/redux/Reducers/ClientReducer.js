let defaultState = {
  clientList: {
    client_id: 1,
    client_image: null,
    client_name: 'BlueBird Inc',
    client_password: '123456',
    contact: '0936696449',
    email: 'thai.nx0601@gmail.com',
  },
};

export const ClientReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Get data from server and load data to UI
    case 'FETCH_CLIENT': {
      state.clientList = [...action.payload];
      return { ...state };
    }

    default:
      return state;
  }
};
