import React, { Component } from "react";
import ModalRoom from "../components/ModalRoom";
import ModalUser from "../components/ModalUser";
import Room from "../components/Room";
import Header from "../Layout/Header";
import styleHeader from "../Layout/Header.css";

export default class Items extends Component {
  render() {
    return (
      <div>
        <main>
          <section className="items container-fluid py-5">
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
              </div>

              {/* In room */}
              <div className="col-8">
            

              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
