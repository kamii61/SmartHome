import React, { useState, useEffect } from 'react';
import './Device.css';
import { connect } from 'react-redux';
import { itemService } from '../../services/';
import ModalEditDevice from './ModalEditDevice';
// socket
import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:8080/Room', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

function Device(props) {
  const { item_id, item_name, item_image } = props.item;

  //let { item_name } = this.props.item;
  const [ledStatus, setLedStatus] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
    });
  }, []);

  // onChange input
  const handleChange = (e) => {
    let { checked } = e.target;
    setLedStatus(checked);

    if (!checked) {
      setLedStatus(1);
      console.log('ledStatus', ledStatus);
    } else {
      setLedStatus(0);
      console.log('ledStatus', ledStatus);
    }

    var json = {
      led: ledStatus,
    };
    console.log('json', json);
    socket.emit('LED', json);
  };

  // Delete room
  const deleteItem = (item_id) => {
    itemService
      .deleteItem(item_id)
      .then((res) => {
        // console.log(res.data);
        props.dispatch({
          type: 'DELETE_ITEM',
          payload: res.data,
          item_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Edit room
  // the first: get data by id
  const getItemById = (item_id) => {
    itemService
      .getItemByID(item_id)
      .then((res) => {
        //console.log(res.data);
        props.dispatch({
          type: 'GET_ITEM_ID',
          payload: res.data,
          item_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='card mr-5 mt-3'>
      <div className='card-title'>
        <h3>{item_name}</h3>
        <img
          className='card-img-top'
          src={`/images/items/${item_image}`}
          width='200'
          height='300'
          alt='img'
        />

        <ModalEditDevice
          getItemById={getItemById}
          item_id={item_id}
          getItemList={props.getItemList}
        />

        <button
          className='btn btn-danger'
          onClick={() => {
            deleteItem(item_id);
          }}
        >
          <i class='fa fa-times-circle'></i>
        </button>
      </div>
      <div className='card-body'>
        <p>{!ledStatus ? 'On' : 'Off'}</p>

        <label className='switch'>
          <input
            type='checkbox'
            name='led'
            value={ledStatus}
            onChange={handleChange}
          />
          <span className='slider round' />
        </label>
      </div>
    </div>
  );
}
export default connect()(Device);
