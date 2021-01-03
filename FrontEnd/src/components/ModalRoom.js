import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";

const ModalRoom = () => {
  const [room_name, setName] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { room_name };
      const response = await fetch("http://localhost:8080/rooms", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }

    // let response = await Axios({
    //   method: "Post",
    //   url: "http://localhost:8080/rooms",
    //   room_name,
    // })
    //   .then((response) => console.log(response.data))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelRoom"
      >
        <i class="fa fa-plus"></i>
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="modelRoom"
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
                      name="idRoom"
                      disabled
                      //value={this.props.roomRedux.room_id}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Name">Name room</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nameRoom"
                      value={room_name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row" style={{}}>
                      <label htmlFor="Image" className="col-2">
                        Image
                      </label>
                      <input type="file" className="col-10" name="fileDevice" />
                    </div>
                    <div id="image-show" />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRoom;
