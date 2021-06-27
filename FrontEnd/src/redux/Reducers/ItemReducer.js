let defaultState = {
  itemList: [],
  itemEdit: [],
  itemRedux: {
    values: {},
  },
};

export const ItemReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Get data from server and load data to UI
    case 'FETCH_ITEM': {
      state.itemList = action.payload;
      return { ...state };
    }

    case 'SET_ITEM_REDUX': {
      state.itemRedux = action.itemRedux;
      return { ...state };
    }

    case 'ADD_ITEM': {
      const itemListUpdate = [...state.itemList, action.payload];
      return { itemList: itemListUpdate, ...state };
    }

    case 'DELETE_ITEM': {
      let itemUpdate = [...state.itemList];

      itemUpdate = itemUpdate.filter((item) => item.item_id !== action.item_id);
      // update state itemList
      state.itemList = itemUpdate;
      return { ...state };
    }

    case 'GET_ITEM_ID': {
      //update state
      state.itemEdit = { ...action.payload };

      let newitemRedux = { ...state.itemRedux };
      newitemRedux.values = { ...action.payload };

      return { ...state, itemRedux: newitemRedux };
    }

    case 'UPDATE_ITEM': {
      const itemListUpdate = [...state.itemList];
      let itemUpdate = itemListUpdate.find((r) => {
        return r.item_id === state.itemRedux.values.item_id;
      });

      if (itemUpdate) {
        itemUpdate.item_id = state.itemRedux.values.item_id;
        itemUpdate.item_name = state.itemRedux.values.item_name;
        itemUpdate.item_image = state.itemRedux.values.item_image;
      }

      state.itemList = itemListUpdate;

      return { ...state };
    }

    default:
      return state;
  }
};
