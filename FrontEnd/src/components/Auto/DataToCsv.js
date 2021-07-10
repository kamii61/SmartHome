import React, { useEffect, useState } from 'react';
import CsvDownload from 'react-json-to-csv';
import { itemService } from '../../services/';

export default function DataToCsv() {
  const [dataItems, setDataItems] = useState([]);

  const getItems = () => {
    let tableItems = [];

    itemService
      .getItemsStatus()
      .then((res) => {
        tableItems = [...res.data];
        // tableItems = tableItems.filter((d) => d.item_name === 'ldr');
        // | (d.item_name === 'ldr')
        setDataItems([...tableItems]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItems();
  }, []);
  //   console.log('data', dataItems);
  return (
    <>
      <CsvDownload
        data={dataItems}
        filename={'export.csv'}
        style={{
          //pass other props, like styles
          boxShadow: 'inset 0px 1px 0px 0px #e184f3',
          background: 'linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)',
          backgroundColor: '#c123de',
          borderRadius: '6px',
          border: '1px solid #a511c0',
          display: 'inline-block',
          cursor: 'pointer',
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 'bold',
          padding: '6px 24px',
          textDecoration: 'none',
          textShadow: '0px 1px 0px #9b14b3',
        }}
      />
    </>
  );
}
