import React from 'react';
import ChartTemp from './ChartTemp';
import ChartHum from './ChartHum';
import ChartGas from './ChartGas';
import ChartPir from './ChartPir';

export default function index() {
  return (
    <div>
      <ChartTemp />
      <ChartHum />
      <ChartGas />
      <ChartPir />
    </div>
  );
}
