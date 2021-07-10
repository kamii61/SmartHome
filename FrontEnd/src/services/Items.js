import axios from 'axios';
import { DOMAIN } from '../util/setting';

class ItemService {
  getItems = async () => {
    return await axios({
      method: 'GET',
      url: `${DOMAIN}/items`,
    });
  };

  getItemsStatus = async () => {
    return await axios({
      method: 'GET',
      url: `${DOMAIN}/items/status`,
    });
  };

  // get item id
  getItemByID = async (item_id) => {
    return await axios({
      method: 'GET',
      url: `${DOMAIN}/items/${item_id}`,
    });
  };

  //delete item
  deleteItem = async (item_id) => {
    return await axios({
      method: 'DELETE',
      url: `${DOMAIN}/items/${item_id}`,
    });
  };

  //add item
  addItem = async (data) => {
    return await axios({
      method: 'POST',
      url: `${DOMAIN}/items`,
      data,
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded / progressEvent.total);
      },
    });
  };

  //edit item
  editItem = async (item_id, data) => {
    return await axios({
      method: 'PUT',
      url: `${DOMAIN}/items/${item_id}`,
      data,
    });
  };
}

export default ItemService;
