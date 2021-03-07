import axios from "axios";
import { DOMAIN } from "../util/setting";

class ClientService {
  signUp = async (data) => {
    return await axios({
      method: "POST",
      url: `${DOMAIN}/clients/signup`,
      data,
    });
  };

  login = async (data) => {
    return await axios({
      method: "POST",
      url: `${DOMAIN}/clients/login`,
      data,
    });
  };

  getClientList = () => {
    return axios({
      method: "GET",
      url: `${DOMAIN}/clients`,
    });
  };
}

export default ClientService;
