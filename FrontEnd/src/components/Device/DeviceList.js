import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// socket
import { io } from 'socket.io-client';
import { itemService } from '../../services/';
import { DOMAIN } from '../../util/setting';
import { bytesToBase64 } from './ByteToBase64';
import ModalDevice from './ModalDevice';
import Device from '../Device/Device';
import Auto from '../Auto';
import DataToCsv from '../Auto/DataToCsv';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const socket = io.connect(`${DOMAIN}/Room`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function DeviceList(props) {
  const [img, setImg] = useState({
    topic: 'image',
    message: 'http://picsum.photos/200/200',
  });
  const [state, setState] = useState({
    ledStatus: false,
    led1Status: false,
    relayStatus: false,
    servoStatus: false,
  });

  const [checkAuto, setCheckAuto] = useState({
    checkedAuto: false,
  });

  const [auto, setAuto] = useState([]);

  const getItemList = () => {
    itemService
      .getItems()
      .then((res) => {
        props.dispatch({
          type: 'FETCH_ITEM',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemList();
  }, []);

  useEffect(() => {
    socket.on('image', (msg) => {
      // b1: get unit8Array of arrayBuffer
      const uint8View = new Uint8Array(msg);
      //console.log(uint8View);

      // b2: covert unit8Array to base64
      const unit8ToBase64 = bytesToBase64(uint8View);
      //console.log("base64", unit8ToBase64);

      setImg(
        { ...img },
        (img.message = 'data:image/jpeg;base64,' + unit8ToBase64)
      );
    });
    console.log('arrBuff', img.message);

    socket.on('connect', () => {
      console.log('socket connected');
    });
  }, [img]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    const newState = Object.values(state);
    const arr = [];
    newState.forEach((s, idx) => {
      arr[idx] = Number(s);
    });

    let json = {
      led: arr,
    };
    console.log('json', json);
    socket.emit('LED', json);
  };

  const handleAuto = (e) => {
    setCheckAuto({ ...checkAuto, [e.target.name]: e.target.checked });

    if (checkAuto.checkedAuto === true) {
      Auto().then((values) => setAuto([...values]));

      const arr = new Float32Array(auto);
      const jsonAuto = {
        autoButton: [auto[0], auto[1]],
      };

      console.log('jsonAuto', jsonAuto);
      socket.emit('Auto', jsonAuto);
      console.log('auto', arr);
    } else {
      alert('turn off auto');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <ModalDevice getItemList={getItemList} />
          <span>ADD DEVICE</span>
        </div>
        <div className='col-6'>
          <DataToCsv />
        </div>
      </div>

      <div className='row'>
        <div className='card text-white col-3' pr='50px'>
          <img className='card-img-top' src={img.message} alt='topic' />
          <div className='card-body'>
            <h4 className='card-title'>ESP Cam</h4>
          </div>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='card  col-3'>
          <div className='card-title'>
            <h3>LED</h3>
          </div>
          <div className='card-body'>
            <p>{!state.ledStatus ? 'On' : 'Off'}</p>

            <label className='switch'>
              <input
                type='checkbox'
                name='ledStatus'
                onChange={handleChange}
                checked={state.ledStatus}
              />
              <span className='slider round' />
            </label>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkAuto.checkedAuto}
                    onChange={handleAuto}
                    name='checkedAuto'
                    color='primary'
                  />
                }
                label='auto'
              />
            </FormGroup>
          </div>
        </div>
        <div className='card text-white col-3'>
          <div className='card-title'>
            <h3>LED1</h3>
          </div>
          <div className='card-body'>
            <p>{!state.led1Status ? 'On' : 'Off'}</p>

            <label className='switch'>
              <input
                type='checkbox'
                name='led1Status'
                onChange={handleChange}
                checked={state.led1Status}
              />
              <span className='slider round' />
            </label>
          </div>
        </div>

        <div className='card text-white col-3'>
          <div className='card-title'>
            <h3>RELAY</h3>
          </div>
          <div className='card-body'>
            <p>{!state.relayStatus ? 'On' : 'Off'}</p>

            <label className='switch'>
              <input
                type='checkbox'
                name='relayStatus'
                onChange={handleChange}
                checked={state.relayStatus}
              />
              <span className='slider round' />
            </label>
          </div>
        </div>

        <div className='card text-white col-3'>
          <div className='card-title'>
            <h3>SERVO</h3>
          </div>
          <div className='card-body'>
            <p>{!state.servoStatus ? 'On' : 'Off'}</p>

            <label className='switch'>
              <input
                type='checkbox'
                name='servoStatus'
                onChange={handleChange}
                checked={state.servoStatus}
              />
              <span className='slider round' />
            </label>
          </div>
        </div>
        {/* device list
      <div className='row mt-3'>
        {props.itemList.map((item, index) => (
          <div key={index}>
            <Device item={item} getItemList={getItemList} />
          </div>
        ))}
      </div> */}
      </div>
    </div>
  );
}

// get data from redux
const mapStateToProps = (state) => ({
  itemList: state.ItemReducer.itemList,
});

export default connect(mapStateToProps)(DeviceList);
