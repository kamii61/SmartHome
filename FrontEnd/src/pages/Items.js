import React, { Component } from "react";
<<<<<<< HEAD
import DeviceList from "../components/Device/DeviceList";
import RoomList from "../components/Room/RoomList";

import "../Layout/Header.css";
=======
import ModalRoom from "../components/ModalRoom";
import ModalUser from "../components/ModalUser";
import Room from "../components/Room";
import Header from "../Layout/Header";
import styleHeader from "../Layout/Header.css";
>>>>>>> e86cec3613e572d871f3429e6f9867695a6b526b

export default class Items extends Component {
  render() {
    return (
      <div>
        <main>
          <section className="items container-fluid py-5">
<<<<<<< HEAD
            <div className="row ">
              <div className="col-4">
                <RoomList />
=======
            <div className="row">
              <div className="col-4">
                <div className="items__info">
                  <div className="row">
                    <ModalUser style={{ display: "inline" }} />

                    <span>Nguyen Van A</span>
                  </div>
                  <div className="row">
                    <input type="text" placeholder="search..." />
                    <i class="fa fa-search"></i>
                  </div>
                </div>

                {/* Room */}
                <Room />
                <ModalRoom />
>>>>>>> e86cec3613e572d871f3429e6f9867695a6b526b
              </div>

              {/* In room */}
              <div className="col-8">
<<<<<<< HEAD
                <DeviceList />
=======
            

>>>>>>> e86cec3613e572d871f3429e6f9867695a6b526b
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
