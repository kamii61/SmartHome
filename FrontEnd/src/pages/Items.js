import React, { Component } from "react";
import DeviceList from "../components/Device/DeviceList";
import RoomList from "../components/Room/RoomList";

export default class Items extends Component {
  render() {
    return (
      <>
        <main className="container-fluid">
          <section className="items  py-5">
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
      </>
    );
  }
}
