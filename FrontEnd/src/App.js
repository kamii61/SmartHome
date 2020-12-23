import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import About from "./pages/About";
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./redux/Reducers/root";
import ModalSignUp from "./components/SignUp/ModalSignUp";
import ModalLogin from "./components/Login/ModalLogin";

const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <switch>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/item" component={Items} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={ModalSignUp} />
            <Route path="/login" component={ModalLogin} />
            <Footer />
          </switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
