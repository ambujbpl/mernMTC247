import React, { useState, useEffect }  from 'react';
import axiosApi from './../../api/axiosApi';
import Chart from './Chart'; 
const LineChartOrders = () => {
  const [ currentWeekTotal, setCurrentWeekTotal ] = useState(0);
  const [ percentageOfIncreaseOrDecrese, setPercentageOfIncreaseOrDecrese ] = useState(0);
  const [ dataChart, setDataChart ] = useState([]);
  const [ dataChartPrevious, setDataChartPrevious ] = useState([]);
  const getData = async () => {    
    const {data} = await axiosApi.get('/getLastWeekOrders');
    setCurrentWeekTotal(data.data.current_weeks_total);
    setPercentageOfIncreaseOrDecrese(data.data.percentage_of_increase_or_decrese);
    setDataChart(data.data.current_weeks);
    setDataChartPrevious(data.data.previous_week);
  }
  useEffect(() => {
    getData();
  }, []);
  if(dataChart){
    return (
      <Chart currentWeekTotal={currentWeekTotal} percentageOfIncreaseOrDecrese={percentageOfIncreaseOrDecrese} data={dataChart} data_pre={dataChartPrevious} type="Line" mainHeading="Increase & decreese number of orders per day" title='Orders' />
    );
  } 
  return <h1>Loading......</h1>
}
export default LineChartOrders;