import React, { useState, useEffect }  from 'react';
import { Line } from 'react-chartjs-2';
import axiosApi from './../api/axiosApi';

const LineChart = () => {
  const [ currentWeekTotal, setCurrentWeekTotal ] = useState(0);
  const [ percentageOfIncreaseOrDecrese, setPercentageOfIncreaseOrDecrese ] = useState(0);
  const [ dataChart, setDataChart ] = useState([]);
  const getData = async () => {    
    const {data} = await axiosApi.get('/getLastWeekOrders');
    setCurrentWeekTotal(data.data.current_weeks_total);
    setPercentageOfIncreaseOrDecrese(data.data.percentage_of_increase_or_decrese);
    setDataChart(data.data.current_weeks)
  }
  useEffect(() => {
    getData();
  }, []);
  if(dataChart){     
    const data = {
      labels: [1,2,3,4,5,6,7],
      datasets: [
        {
          label: 'Orders Last 7 days',
          data: dataChart,
          borderColor: ['rgba(238, 212, 97, 0.2)'],
          backgroundColor: ['rgba(238, 212, 97, 0.2)'],
          pointBackgroundColor: 'rgba(238, 212, 97, 0.2)',
          pointBorderColor: 'rgba(238, 212, 97, 0.2)'
        }
      ]
    }

    const options = {
      title: {
        display: false,
        text: 'Line Chart'
      },
      scales: {
        yAxes: [
          {
            // ticks: {
            //   min: 0,
            //   max: 6,
            //   stepSize: 1
            // }
          }
        ]
      }
    }

    return (
      <div>
        <h1>{currentWeekTotal}</h1>
        <div>{percentageOfIncreaseOrDecrese} Increase & decreese sales amount par day</div>
        <Line data={data} options={options} />
      </div>
    );
  } 
  return <h1>Loading......</h1>
}

export default LineChart