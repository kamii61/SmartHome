import axios from "axios";
import { DOMAIN } from "../util/setting";

class ItemService {
  getItems = async () => {
    return await axios({
      method: "GET",
      url: `${DOMAIN}/items`,
    });
  };
}

export default ItemService;
