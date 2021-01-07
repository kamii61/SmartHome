import React, { Component } from "react";
import ModalRoom from "./ModalRoom";
import ModalUser from "../ModalUser";
import Axios from "axios";
import { connect } from "react-redux";
import Room from "./Room";
import { roomService } from "../../services/";

class RoomList extends Component {
  //   render roomList from data
  renderRoom = () => {
    return this.props.roomList.map((room, index) => {
      return <Room room={room} key={index} getRoomList={this.getRoomList} />;
    });
  };

  render() {
    return (
      <>
        <div className="items__info row">
          <div className="col-12">
            <ModalUser style={{ display: "inline" }} />

            <span>Nguyen Van A</span>
          </div>
        </div>

        {/* Room */}
        {this.renderRoom()}

        <div className="row mt-3">
          <div className="col-12">
            <ModalRoom getRoomList={this.getRoomList} />
          </div>
        </div>
      </>
    );
  }

  getRoomList = () => {
    roomService
      .getRoom()
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
  roomList: state.RoomReducer.roomList,
});

export default connect(mapStateToProps)(RoomList);
