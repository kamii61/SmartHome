import React, { useState } from 'react';
import { connect } from 'react-redux';
import { itemService } from '../../services';

const ModalEditDevice = (props) => {
  let [selectedItem, setSelectedItem] = useState('');

  const onChange = (e) => {
    let { value, name } = e.target;
    const newValues = { ...props.itemRedux.values }; // luu tru lai cac gia tri truoc user da nhap
    newValues[name] = value; // gan gia tri moi cho thuoc tinh dang nhap

    setSelectedItem(value);

    if (e.target.file) {
      setSelectedItem({ item_image: e.target.files[0] });
    }

    setSelectedItem({
      ...selectedItem,
      [e.target.name]: value,
    });

    props.dispatch({
      type: 'SET_ITEM_REDUX',
      itemRedux: {
        values: newValues,
      },
    });
  };

  // Submit form
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const item_id = props.itemRedux.values.item_id;

    itemService
      .editItem(item_id, {
        item_name: selectedItem,
      })
      .then((response) => {
        props.dispatch({
          type: 'UPDATE_ITEM',
          payload: response.data,
        });
        props.getitemList();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Modal */}
      <button
        type='button'
        className='btn btn-primary '
        data-toggle='modal'
        data-target='#modelEditItem'
        onClick={() => {
          props.getItemById(props.item_id);
        }}
      >
        <i className='fa fa-edit'></i>
      </button>

      <div
        className='modal fade'
        id='modelEditItem'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>item</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmitForm}>
                <div>
                  <div className='form-group'>
                    <label htmlFor='ID'>ID</label>
                    <input
                      type='text'
                      className='form-control'
                      name='item_id'
                      disabled
                      value={props.itemRedux.values.item_id}
                      onChange={onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Name'>Name item</label>
                    <input
                      type='text'
                      className='form-control'
                      name='item_name'
                      onChange={onChange}
                      value={props.itemRedux.values.item_name}
                    />
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <label htmlFor='Image' className='col-2'>
                        Image
                      </label>
                      <input type='file' className='col-10' name='item_image' />
                    </div>
                    <div id='image-show' />
                  </div>

                  <button type='submit' className='btn btn-primary'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  itemList: state.ItemReducer.itemList,
  itemRedux: state.ItemReducer.itemRedux,
  itemEdit: state.ItemReducer.itemEdit,
});

export default connect(mapStateToProps)(ModalEditDevice);
