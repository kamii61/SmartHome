import axios from "axios";
class ClientService {
  signUp = async (data) => {
    return await axios({
      method: "POST",
      url: "http://localhost:8000/clients/signup",
      data,
    });
  };

  login = async (data) => {
    return await axios({
      method: "POST",
      url: "http://localhost:8000/clients/login",
      data,
    });
  };
}

export default ClientService;
