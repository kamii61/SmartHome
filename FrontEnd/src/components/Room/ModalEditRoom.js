import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";

const ModalEditRoom = (props) => {
  let [selectedRoom, setSelectedRoom] = useState({});

  selectedRoom = props.roomRedux.values;
  const onChange = (e) => {
    setSelectedRoom({ ...selectedRoom, [e.target.name]: e.target.value });
  };

  // Submit form
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("room name selec", selectedRoom.room_name);
    updateRoom(selectedRoom.room_name);
  };

  // update room
  const updateRoom = async (room_id) => {
    let response = await Axios({
      method: "PUT",
      url: `http://localhost:8000/rooms/${room_id}`,
      data: {
        room_name: selectedRoom,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Modal */}
      <button
        type="button"
        className="btn btn-primary "
        data-toggle="modal"
        data-target="#modelEditRoom"
        onClick={() => {
          props.editRoom(props.room_id);
          console.log("selectedRoom", selectedRoom);
        }}
      >
        <i class="fa fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id="modelEditRoom"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Room</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitForm}>
                <div>
                  <div className="form-group">
                    <label htmlFor="ID">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="room_id"
                      disabled
                      value={selectedRoom.room_id}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Name">Name room</label>
                    <input
                      type="text"
                      className="form-control"
                      name="room_name"
                      onChange={onChange}
                      value={selectedRoom.room_name}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <label htmlFor="Image" className="col-2">
                        Image
                      </label>
                      <input type="file" className="col-10" name="fileDevice" />
                    </div>
                    <div id="image-show" />
                  </div>

                  <button type="submit" className="btn btn-primary">
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
  roomList: state.room.roomList,
  roomRedux: state.room.roomRedux,
  roomEdit: state.room.roomEdit,
});

export default connect(mapStateToProps)(ModalEditRoom);
