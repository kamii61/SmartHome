import axios from "axios";
import { DOMAIN, ACCESS_TOKEN } from "../util/setting";

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
}

export default ClientService;
