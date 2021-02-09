import React, { useState, useEffect }  from 'react';
import axiosApi from './../../api/axiosApi';
import Chart from './Chart';
const LineChartSales = () => {
  const [ currentWeekTotal, setCurrentWeekTotal ] = useState(0);
  const [ percentageOfIncreaseOrDecrese, setPercentageOfIncreaseOrDecrese ] = useState(0);
  const [ dataChartCurrent, setDataChartCurrent ] = useState([]);
  const [ dataChartPrevious, setDataChartPrevious ] = useState([]);
  const getData = async () => {    
    const {data} = await axiosApi.get('/getLastWeekSales');
    setCurrentWeekTotal(data.data.current_weeks_total);
    setPercentageOfIncreaseOrDecrese(data.data.percentage_of_increase_or_decrese);
    setDataChartCurrent(data.data.current_weeks);
    setDataChartPrevious(data.data.previous_week);
  }
  useEffect(() => {
    getData();
  }, []);
  if(dataChartCurrent){
    return (
      <Chart currentWeekTotal={currentWeekTotal} percentageOfIncreaseOrDecrese={percentageOfIncreaseOrDecrese} data={dataChartCurrent} data_pre={dataChartPrevious} type="Line" mainHeading="Increase & decreese sales amount per day" title='Sales'/>
    );
  } 
  return <h1>Loading......</h1>
}
export default LineChartSales;