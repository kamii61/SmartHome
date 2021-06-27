import React, { useState } from 'react';
import { connect } from 'react-redux';
import { roomService } from '../../services';

const ModalEditRoom = (props) => {
  let [selectedRoom, setSelectedRoom] = useState('');

  const onChange = (e) => {
    let { value, name } = e.target;
    const newValues = { ...props.roomRedux.values }; // luu tru lai cac gia tri truoc user da nhap
    newValues[name] = value; // gan gia tri moi cho thuoc tinh dang nhap

    if (e.target.file) {
      setSelectedRoom({ room_image: e.target.files[0] });
    }

    setSelectedRoom({
      ...selectedRoom,
      [e.target.name]: value,
    });

    props.dispatch({
      type: 'SET_ROOM_REDUX',
      roomRedux: {
        values: newValues,
      },
    });
  };

  // Submit form
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const room_id = props.roomRedux.values.room_id;
    console.log('aaa', selectedRoom);
    roomService
      .editRoom(room_id, {
        room_name: selectedRoom.room_name,
        room_image: selectedRoom.room_image.replace(/C:\\fakepath\\/i, ''),
      })
      .then((response) => {
        props.dispatch({
          type: 'UPDATE_ROOM',
          payload: response.data,
        });
        props.getRoomList();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Modal */}
      <button
        type='button'
        className='btn btn-primary '
        data-toggle='modal'
        data-target='#modelEditRoom'
        onClick={() => {
          props.getRoomById(props.room_id);
        }}
      >
        <i class='fa fa-edit'></i>
      </button>

      <div
        className='modal fade'
        id='modelEditRoom'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Room</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmitForm}>
                <div>
                  <div className='form-group'>
                    <label htmlFor='ID'>ID</label>
                    <input
                      type='text'
                      className='form-control'
                      name='room_id'
                      disabled
                      // value={selectedRoom.room_id}
                      value={props.roomRedux.values.room_id}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Name'>Name room</label>
                    <input
                      type='text'
                      className='form-control'
                      name='room_name'
                      onChange={onChange}
                      // value={selectedRoom.room_name}
                      value={props.roomRedux.values.room_name}
                    />
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <label htmlFor='Image' className='col-2'>
                        Image
                      </label>
                      <input
                        type='file'
                        className='col-10'
                        name='room_image'
                        onChange={onChange}
                      />
                    </div>
                    <div id='image-show' />
                  </div>

                  <button type='submit' className='btn btn-primary'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  roomList: state.RoomReducer.roomList,
  roomRedux: state.RoomReducer.roomRedux,
  roomEdit: state.RoomReducer.roomEdit,
});

export default connect(mapStateToProps)(ModalEditRoom);
