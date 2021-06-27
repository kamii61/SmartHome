import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Clients from './components/Clients/Clients';
import DeviceList from './components/Device/DeviceList';
import Login from './components/Login/Login';
import RoomList from './components/Room/RoomList';
import SignUp from './components/SignUp/SignUp';
import Admin from './Layout/Admin/Admin';
import HomeTemplate from './Layout/HomeTemplate/HomeTemplate';
import LoginTemplate from './Layout/LoginTemplate/LoginTemplate';
import About from './pages/About';
import Home from './pages/Home';
import Items from './pages/Items';
import { store } from './redux/root';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Switch>
            <HomeTemplate path='/' exact Component={Home} />
            <HomeTemplate path='/item' exact Component={Items} />
            <HomeTemplate path='/about' exact Component={About} />

            <LoginTemplate path='/login' Component={Login} />
            <LoginTemplate path='/signup' Component={SignUp} />

            <Admin path='/admin/client' Component={Clients} />
            <Admin path='/admin/room' Component={RoomList} />
            <Admin path='/admin/item' Component={DeviceList} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

// export function PrivateRoute({ component: Component, authenticated, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: '/login', state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }

// export function PublicRoute({ component: Component, authenticated, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authenticated === false ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to='/admin/item' />
//         )
//       }
//     />
//   );
// }

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       authenticated: false,
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({
//           authenticated: true,
//           loading: false,
//         });
//       } else {
//         this.setState({
//           authenticated: false,
//           loading: false,
//         });
//       }
//     });
//   }

//   render() {
//     return this.state.loading === true ? (
//       <div className='spinner-border text-success' role='status'>
//         <span className='sr-only'>Loading...</span>
//       </div>
//     ) : (
//       <Provider store={store}>
//         <Router>
//           <Switch>
//             <Route exact path='/' component={Home} />
//             <PrivateRoute
//               path='/admin/item'
//               authenticated={this.state.authenticated}
//               component={DeviceList}
//             />
//             <PublicRoute
//               path='/signup'
//               authenticated={this.state.authenticated}
//               component={SignUp}
//             />
//             <PublicRoute
//               path='/login'
//               authenticated={this.state.authenticated}
//               component={Login}
//             />
//           </Switch>
//         </Router>
//       </Provider>
//     );
//   }
// }

// export default App;
