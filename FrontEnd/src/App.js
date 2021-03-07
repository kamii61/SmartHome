import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import About from "./pages/About";
import { Provider } from "react-redux";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import React from "react";
import { store } from "./redux/root";
import LoginTemplate from "./Layout/LoginTemplate/LoginTemplate";
import HomeTemplate from "./Layout/HomeTemplate/HomeTemplate";
import Admin from "./Layout/Admin/Admin";
import Clients from "./components/Clients/Clients";
import RoomList from "./components/Room/RoomList";
import DeviceList from "./components/Device/DeviceList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <HomeTemplate path="/" exact Component={Home} />
            <HomeTemplate path="/item" exact Component={Items} />
            <HomeTemplate path="/about" exact Component={About} />

            <LoginTemplate path="/login" Component={Login} />
            <LoginTemplate path="/signup" Component={SignUp} />

            <Admin path="/admin/client" Component={Clients} />
            <Admin path="/admin/room" Component={RoomList} />
            <Admin path="/admin/item" Component={DeviceList} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
