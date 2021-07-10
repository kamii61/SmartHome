import React, { useEffect } from 'react';
import { clientService } from '../../services';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ClientReducer } from '../../redux/Reducers/ClientReducer';

function Clients(props) {
  const { clientList } = props;
  // useSelector thay cho mapStateToProps
  // const clientList = useSelector((state) => state.ClientReducer.clientList);
  const dispatch = useDispatch();
  const getClientList = () => {
    clientService
      .getClientList()
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'FETCH_CLIENT',
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClientList();
  }, []);

  console.log('client', clientList);
  const renderClient = () => {
    return clientList?.map((client, index) => {
      return (
        <tr key={index}>
          <td>{client.client_id}</td>
          <td>{client.client_name}</td>
          <td>{client.contact}</td>
          <td>{client.email}</td>
          <td>{client.client_image}</td>
          <td>
            <button className='btn btn-primary'>
              <i className='fas fa-user-edit'></i>
            </button>
          </td>
          <td>
            <button className='btn btn-danger'>
              <i className='fas fa-trash-alt'></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>

        <tbody>{renderClient()}</tbody>
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
