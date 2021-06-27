import React, { useState } from 'react';
import { connect } from 'react-redux';

import { itemService } from '../../services/';

const Modalitem = (props) => {
  const [item, setitem] = useState({
    item_name: '',
    item_image: null,
  });

  const onChange = (e) => {
    let { value, name } = e.target;
    const newValues = { ...props.itemRedux.values }; // luu tru lai cac gia tri truoc user da nhap

    newValues[name] = value; // gan gia tri moi cho thuoc tinh dang nhap

    if (e.target.file) {
      setitem({ item_image: e.target.files[0] });
    }

    setitem({
      ...item,
      [e.target.name]: value,
    });

    props.dispatch({
      type: 'SET_ITEM_REDUX',
      itemRedux: {
        values: newValues,
      },
    });
  };

  // add item
  const onSubmitForm = async (e) => {
    const { item_name, item_image } = item;
    e.preventDefault(); // chặn sự kiện submit của browser

    itemService
      .addItem({
        item_name,
        item_image: item_image.replace(/C:\\fakepath\\/i, ''),
      })
      .then((response) => {
        props.dispatch({
          type: 'ADD_ITEM',
          payload: response.data,
          item: props.itemRedux.values,
        });
        props.getItemList();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        type='button'
        className='btn btn-primary btn-lg'
        data-toggle='modal'
        data-target='#modelItem'
      >
        <i class='fa fa-plus'></i>
      </button>
      {/* Modal */}
      <div
        className='modal fade'
        id='modelItem'
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
                <div className='form-group'>
                  <label htmlFor='ID'>ID</label>
                  <input
                    type='text'
                    className='form-control'
                    name='item_id'
                    disabled
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='Name'>Name item</label>
                  <input
                    type='text'
                    className='form-control'
                    name='item_name'
                    value={item.item_name}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <div className='row' style={{}}>
                    <label htmlFor='Image' className='col-2'>
                      Image
                    </label>
                    <input
                      type='file'
                      className='col-10'
                      name='item_image'
                      value={item.item_image}
                      onChange={onChange}
                    />
                  </div>
                  <div id='image-show' />
                </div>
                <button type='submit' className='btn btn-success mr-3'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemList: state.ItemReducer.itemList,
  itemRedux: state.ItemReducer.itemRedux,
  itemEdit: state.ItemReducer.itemEdit,
});

export default connect(mapStateToProps)(Modalitem);
