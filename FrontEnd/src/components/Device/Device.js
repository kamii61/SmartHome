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

  const [gas, setGas] = useState({ topic: 'GAS', message: 0 });
  const [ldr, setLdr] = useState({ topic: 'LDR', message: 1 });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on(gas.topic, (msg) => {
      setGas({ ...gas }, (gas.message = msg));
    });
    socket.on(gas.topic, (msg) => {
      setGas({ ...gas }, (gas.message = msg));
    });

    socket.on(ldr, (msg) => {
      setLdr({ ...ldr }, (ldr.message = msg));
    });
  }, []);

  const deleteItem = (item_id) => {
    itemService
      .deleteItem(item_id)
      .then((res) => {
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

  const getItemById = (item_id) => {
    itemService
      .getItemByID(item_id)
      .then((res) => {
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
          width='200px'
          height='300px'
          alt='img'
          objectFit='cover'
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
          <i className='fa fa-times-circle'></i>
        </button>
      </div>
      <div className='card-body'>
        <h4>Value</h4>
        <p>{item_name == 'Gas' ? gas.message : ldr.message}</p>
      </div>
    </div>
  );
}
export default connect()(Device);
