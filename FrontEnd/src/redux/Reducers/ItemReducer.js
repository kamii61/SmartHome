let defaultState = {
  itemList: {
    item_name: "Camera",
    item_data_description: "moi mua",
    item_status: 1,
  },
};

export const ItemReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Get data from server and load data to UI

    default:
      return state;
  }
};
