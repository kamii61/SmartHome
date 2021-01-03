import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Header from "./Layout/Header/Header";
import About from "./pages/About";
import { Provider } from "react-redux";
import ModalSignUp from "./components/SignUp/ModalSignUp";
import ModalLogin from "./components/Login/ModalLogin";
import Footer from "./Layout/Footer/Footer";
import React from "react";
import { store } from "./redux/root";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {/* Header */}
          <Header />

          {/* Main */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/item" exact component={Items} />
            <Route path="/about" exact component={About} />
            <Route path="/signup" exact component={ModalSignUp} />
            <Route path="/login" exact component={ModalLogin} />
          </Switch>

          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
