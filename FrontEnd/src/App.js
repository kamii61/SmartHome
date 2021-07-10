import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import ChartGas from './components/Chart/ChartGas';
import ChartHum from './components/Chart/ChartHum';
import ChartLDR from './components/Chart/ChartLDR';
import ChartPir from './components/Chart/ChartPir';
import ChartTemp from './components/Chart/ChartTemp';
import Clients from './components/Clients/Clients';
import DeviceList from './components/Device/DeviceList';
import Login from './components/Login/Login';
import RoomList from './components/Room/RoomList';
import SignUp from './components/SignUp/SignUp';
import Admin from './Layout/Admin/Admin';
import HomeTemplate from './Layout/HomeTemplate/HomeTemplate';
import LoginTemplate from './Layout/LoginTemplate/LoginTemplate';
import About from './pages/About';
import Camera from './pages/Camera';
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
            <Admin path='/admin/chart/temp' Component={ChartTemp} />
            <Admin path='/admin/chart/hum' Component={ChartHum} />
            <Admin path='/admin/chart/gas' Component={ChartGas} />
            <Admin path='/admin/chart/pir' Component={ChartPir} />
            <Admin path='/admin/chart/ldr' Component={ChartLDR} />
            <Admin path='/admin/camera' Component={Camera} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
