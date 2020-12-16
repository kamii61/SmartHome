import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Router>
        <switch>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/item" component={Items} />
          <Route path="/about" component={About} />
          <Footer />
        </switch>
      </Router>
    </div>
  );
}

export default App;
