import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import ModalEditRoom from "./ModalEditRoom";

class Room extends Component {
  render() {
    let { room_id, room_name } = this.props.room;
    return (
      <div>
        {/* room */}

        <div className="card mt-4">
          <div className="card-header">
            <h3 className="card-title ">{room_name}</h3>
            <img
              className="card-img-top"
              src="http://picsum.photos/200/200"
              width="200"
              height="300"
            />

            {/* btn edit room */}

            <ModalEditRoom getRoomById={this.getRoomById} room_id={room_id} />

            {/* btn remove room */}
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                this.deleteRoom(room_id);
              }}
            >
              <i class="fa fa-times-circle"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h4>Temperter</h4>
                <p>
                  28 <span>*C</span>
                </p>
              </div>
              <div className="col-6">
                <h4>Huminity</h4>
                <p>
                  150<span>%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Delete room
  deleteRoom = (room_id) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:8000/rooms/${room_id}`,
    })
      .then((res) => {
        // console.log(res.data);
        this.props.dispatch({
          type: "DELETE_ROOM",
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log("err delete room list", err);
      });
  };

  // Edit room
  // the first: get data by id
  getRoomById = (room_id) => {
    Axios({
      method: "GET",
      url: `http://localhost:8000/rooms/${room_id}`,
    })
      .then((res) => {
        //console.log(res.data);
        this.props.dispatch({
          type: "GET_ROOM_ID",
          payload: res.data,
          room_id,
        });
      })
      .catch((err) => {
        console.log("err get by id room list", err);
      });
  };
}
export default connect()(Room);
