import axios from "axios";
import { ACCESS_TOKEN, DOMAIN, USER_LOGIN } from "../../util/setting";

export const loginAction = (client, props) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${DOMAIN}/clients`,
        method: "POST",
        data: client,
      });
      //Đăng nhập thành công
      console.log(result.data);
      //Lấy token lưu vào localstorage
      localStorage.setItem(ACCESS_TOKEN, result.data.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
      props.history.push("/");
      //props.history.goBack();
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};
