import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="">
        <main>
          {/* intro */}
          <section className="container-fluid  homeIntro mt-5">
            <div className="row">
              <div className="icon-list col-3">
                <a href="#">
                  <i class="fas fa-window-minimize text-white"></i>
                </a>
                <a href="#">
                  <i class="fas fa-window-minimize text-white"></i>
                </a>
                <a href="#">
                  <i class="fas fa-window-minimize text-white"></i>
                </a>
              </div>

              <div className="col-6 text-center">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/jDaRPsvvcz4?start=6"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>

                <button className="btn text-dark border rounded-pill border-dark bg-white px-5">
                  Demo
                </button>
              </div>

              <div className="icon-next col-3">
                <a href="#">
                  <i class="fa fa-angle-right"></i>
                </a>
                <a href="#">
                  <i class="fa fa-angle-left"></i>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
