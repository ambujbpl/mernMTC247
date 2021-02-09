import React, { useState, useEffect }  from 'react';
import { Line, Bar } from 'react-chartjs-2';

const Chart = (props) => {
  console.log(props);
  let labels = [];
  props.data.map((e,i) => labels.push(i+1));
  let dataSets = [];
  let labelTitle = '';
  props.type.trim().toLowerCase() === "line" ? labelTitle = `last week ${props.title}` : labelTitle = 'last two weeks Orders';
  dataSets.push({
    label: labelTitle,
    data: props.data,
    borderColor: ['rgba(255, 206, 86, 0.2)'],
    backgroundColor: ['rgba(255, 206, 86, 0.2)'],
    pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
    pointBorderColor: 'rgba(255, 206, 86, 0.2)'
  })
  if(props.data_pre){
    dataSets.push({
      label: `last to last week ${props.title}`,
      data: props.data_pre,
      borderColor: ['rgba(54, 162, 235, 0.2)'],
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBorderColor: 'rgba(54, 162, 235, 0.2)'
    })    
  }
  const chartdata = {
    labels: labels,
    datasets: dataSets
  }

  const options = {
    title: {
      display: false,
      text: 'Line Chart'
    },
    scales: {
      yAxes: []
    }
  }
  const renderChart = () => {
    if(props.type.trim().toLowerCase() === "line"){
      return <Line data={chartdata} options={options} />
    } else if(props.type.trim().toLowerCase() === "bar"){
      return <Bar data={chartdata} options={options} />
    }
  }
  return (
    <div>
      <h1><center>{props.currentWeekTotal}</center></h1>
      <div className="row">
        <div className="col s4"><h5>{props.percentageOfIncreaseOrDecrese}</h5></div>
        <div className="col s8">{props.mainHeading}</div>
      </div>
      {renderChart()}      
    </div>
  );
}

export default Chart;