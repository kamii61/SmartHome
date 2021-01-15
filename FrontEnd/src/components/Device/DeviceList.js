import React, { Component } from "react";
import Device from "./Device";
import ModalDevice from "./ModalDevice";
import { itemService } from "../../services/";
import { connect } from "react-redux";

class DeviceList extends Component {
  //get items
  getListItem = () => {
    itemService
      .getItems()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ModalDevice />
            <span>ADD DEVICE</span>
          </div>
        </div>
        {/* device list */}
        <div className="row"></div>
      </div>
    );
  }
  componentDidMount() {
    this.getListItem();
    console.log("item list redux", this.props.itemList);
  }
}

// get data from redux
const mapStateToProps = (state) => ({
  itemList: state.ItemReducer.itemList,
});

export default connect(mapStateToProps)(DeviceList);
