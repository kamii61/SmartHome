import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';
import csvFile from './sensordata.csv';
import { itemService } from '../../services/';
import { useState } from 'react';

async function Auto() {
  let resultPred;
  //   const run = async () => {
  const data = await LoadData();
  console.log('dataCsv', data);
  const features = ['ldr'];
  const [trainDs, validDs, xTest, yTest] = createDataSets(
    data,
    features,
    0.1,
    16
  );
  const model = await trainLogisticRegression(
    features.length,
    trainDs,
    validDs
  );

  console.log('Done trainning');

  // const a = [[148, 50, 0, 72],[0,0,0,0]];
  // const b = tf.tensor(a);
  // const pred=model.predict(b).dataSync();
  const pred = model.predict(xTest).dataSync();

  const predArr = pred;
  // for (const i in predArr) {
  //   let a = Math.round(predArr[i]);
  // //   console.log(${i}: ${a});

  // }
  const newPredArr = predArr.map((a) => Math.round(a));
  // console.log('newArr', newPredArr.slice(0, 2));
  resultPred = newPredArr.slice(0, 2);

  // for (const i in pred) {
  //  let a=Math.round(pred[i]);
  //   console.log(`${i}: ${a}`);
  // }

  // console.log("xTest",xTest)
  // console.log("yTest",yTest)
  // const preds = abc.predict(xTest).argMax(-1)
  // const preds = model.predict(xTest)
  // const labels = yTest.argMax(-1)
  // console.log("predict",preds)
  // console.log("labels",labels.values)

  // const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds)
  // const container = document.getElementById("confusion-matrix")
  // tfvis.render.confusionMatrix(container, {
  //   values: confusionMatrix,
  //   tickLabels: ["Healthy", "Diabetic"],
  // })
  //};
  //   run();
  console.log('result', resultPred);

  return resultPred;

  //   return (
  //     <div className='App'>
  //       <body>
  //         <div id='chart-cont' />
  //         <div id='loss-cont' />
  //         <div id='acc-cont' />
  //         <div id='confusion-matrix' />
  //       </body>
  //     </div>
  //   );
}

export default Auto;

export async function LoadData() {
  Papa.parsePromise = function (file) {
    return new Promise(function (complete, error) {
      Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete,
        error,
      });
    });
  };
  const csv = await Papa.parsePromise(csvFile);

  return csv.data;
}

export const oneHot = (outcome) => Array.from(tf.oneHot(outcome, 2).dataSync());

export const createDataSets = (data, features, testSize, batchSize) => {
  // const dataLDR = data.filter(
  //   (d) =>
  //     d.item_name === 'ldr' && d.item_status !== null && d.item_status !== 0
  // );
  // const dataLed = data.filter(
  //   (d) => d.item_name === 'led' && d.item_status !== null
  // );

  // const newLDR = dataLDR.slice(0, dataLed.length);

  const X = data.map((r) =>
    features.map((f) => {
      const val = r[f];
      return val === undefined ? 0 : val;
    })
  );
  console.log('x', X);
  const y = data.map((r) => {
    const outcome = r.led === undefined ? 0 : r.led;

    return oneHot(outcome);
  });
  console.log('y', y);

  const splitIdx = parseInt((1 - testSize) * data.length, 10);

  const ds = tf.data
    .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
    .shuffle(data.length, 42);
  return [
    ds.take(splitIdx).batch(batchSize),
    ds.skip(splitIdx + 1).batch(batchSize),
    tf.tensor(X.slice(splitIdx)),
    tf.tensor(y.slice(splitIdx)),
  ];
};

const trainLogisticRegression = async (featureCount, trainDs, validDs) => {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 12,
      activation: 'relu',
      inputShape: [featureCount],
    })
  );

  model.add(
    tf.layers.dense({
      units: 2,
      activation: 'softmax',
    })
  );
  const optimizer = tf.train.adam(0.001);
  model.compile({
    optimizer: optimizer,
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  // const trainLogs = [];
  // const lossContainer = document.getElementById('loss-cont');
  // const accContainer = document.getElementById('acc-cont');
  model.fitDataset(trainDs, {
    epochs: 100,
    validationData: validDs,
    shuffle: true,
    // callbacks: {
    //   onEpochEnd:  (epoch, logs) => {
    //     trainLogs.push(logs)
    //     tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"])
    //     tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"])
    //   },
    // },
  });

  return model;
};
