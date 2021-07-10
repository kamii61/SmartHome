import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import csv from './dht-temp.csv';
import { itemService } from '../../../services';

export default function ChartTemp() {
  const [chartData, setChartData] = useState({});
  const xLabels = [];
  const yLabels = [];
  const numberElement = 100;
  // const updateInterval = 50;
  let updateCount = 0;
  // get api data {}
  let tableItems = [];
  const getItems = () => {
    itemService
      .getItems()
      .then((res) => {
        tableItems = [...res.data];
        tableItems = tableItems.filter((d) => d.item_name === 'dht/tc');
        console.log('data', tableItems);

        const table = tableItems;
        table.forEach((row) => {
          const time = new Date(row.item_time);

          if (new Date().getDate() === time.getDate()) {
            // xLabels.push(time.toUTCString().split(' ').slice(1, 5).join(' '));
            let time1 =
              time.getHours().toString() +
              ':' +
              time.getMinutes().toString() +
              ':' +
              time.getSeconds().toString();
            xLabels.push(time1);
          }

          const temp = row.item_status;
          yLabels.push(parseFloat(temp));
        });

        if (updateCount > numberElement) {
          xLabels.shift();
          yLabels.shift();
          console.log('cut', xLabels.shift(), yLabels.shift());
        } else {
          updateCount++;
        }

        setChartData({
          labels: xLabels,
          datasets: [
            {
              label: 'Temp',
              data: yLabels,
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        });

        // setInterval(function () {

        // }, updateInterval);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // convert csv

  // async function getData() {
  //   const response = await fetch(csv);
  //   const data = await response.text();
  //   console.log('csv', data);

  //   const table = data.split('\n').slice(1);
  //   table.forEach((row) => {
  //     const columns = row.split(',');
  //     const time = columns[3];
  //     xLabels.push(time);
  //     const temp = columns[2];
  //     yLabels.push(parseFloat(temp));
  //   });
  // }

  // const chart = async () => {
  //   await getItems();
  //   setChartData({
  //     labels: xLabels,
  //     datasets: [
  //       {
  //         label: 'Temp',
  //         data: yLabels,
  //         backgroundColor: ['rgba(255, 99, 132, 0.2)'],
  //         borderColor: ['rgba(255, 99, 132, 1)'],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };
  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          // displayFormats: {
          //   milisecond: 'mm:ss:SSS',
          // },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
}
