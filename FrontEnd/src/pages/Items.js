import React, { Component } from "react";
import DeviceList from "../components/Device/DeviceList";
import RoomList from "../components/Room/RoomList";

import "../Layout/Header.css";

export default class Items extends Component {
  render() {
    return (
      <div>
        <main>
          <section className="items container-fluid py-5">
            <div className="row ">
              <div className="col-4">
                <RoomList />
              </div>

              {/* In room */}
              <div className="col-8">
                <DeviceList />
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
