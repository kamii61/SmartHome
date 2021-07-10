import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { itemService } from '../../../services';

export default function ChartPir() {
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
        tableItems = tableItems.filter((d) => d.item_name === 'pir');
        console.log('data', tableItems);

        const table = tableItems;
        table.forEach((row) => {
          const time = new Date(row.item_time);
          const time1 = time.getDate();
          if (new Date().getDate() === time1) {
            let time1 =
              time.getHours().toString() +
              ':' +
              time.getMinutes().toString() +
              ':' +
              time.getSeconds().toString();
            xLabels.push(time1);
          }

          const pir = row.item_status;
          yLabels.push(parseFloat(pir));
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
              label: 'pir',
              data: yLabels,
              backgroundColor: ['d9ffb3'],
              borderColor: ['#336600'],
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
  
  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
      
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
