import React, { Component } from "react";
import ModalRoom from "./ModalRoom";
import ModalUser from "../ModalUser";
import Axios from "axios";
import { connect } from "react-redux";
import Room from "./Room";

class RoomList extends Component {
  //   render roomList from data
  renderRoom = () => {
    return this.props.roomList.map((room, index) => {
      return <Room room={room} />;
    });
  };

  render() {
    return (
      <>
        <div className="items__info ">
          <div className="row">
            <ModalUser style={{ display: "inline" }} />

            <span>Nguyen Van A</span>
          </div>
        </div>

        {/* Room */}
        {this.renderRoom()}

        <div className="row ">
          <ModalRoom getRoomList={this.getRoomList} />
        </div>
      </>
    );
  }

  getRoomList = () => {
    Axios({
      method: "GET",
      url: "http://localhost:8000/rooms",
    })
      .then((res) => {
        this.props.dispatch({
          type: "FETCH_ROOM",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("err get room list", err);
      });
  };

  componentDidMount() {
    //get room list
    this.getRoomList();
  }
}
// get data from redux
const mapStateToProps = (state) => ({
  roomList: state.room.roomList,
});

export default connect(mapStateToProps)(RoomList);
