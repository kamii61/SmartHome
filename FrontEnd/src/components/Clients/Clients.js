import React, { useEffect } from "react";
import { clientService } from "../../services";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

function Clients(props) {
  const dispatch = useDispatch();
  const getClientList = () => {
    console.log("client", props.clientList);

    clientService
      .getClientList()
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "FETCH_CLIENT",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClientList();
  }, []);

  // const renderClient = () => {
  //   return props.clientList?.map((client, index) => {
  //     return (
  //       <tr key={index}>
  //         <td>{client.client_id}</td>
  //         <td>{client.client_name}</td>
  //       </tr>
  //     );
  //   });
  // };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
          </tr>
        </thead>

        {/* <tbody>{renderClient()}</tbody> */}
      </table>
    </>
  );
}

// // get data from redux
// const mapStateToProps = (state) => ({
//   clientList: state.ClientReducer.clientList,
// });

// export default connect(mapStateToProps)(Clients);
export default Clients;
