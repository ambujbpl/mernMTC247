// import React, {Component} from 'react';
// import { Element } from 'react-faux-dom';
// import * as d3 from 'd3';
// import axiosApi from './../../api/axiosApi';
// const width = 500;
// const height = 400;
// class FirstChartArea extends Component {
//   state = { data: []}
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }
//   getData = async () => {    
//     const {data} = await axiosApi.get('/getLastTwoWeekOrders');
//     const chatData = data.data.map(item => item.quantity)
//     this.setState({data:chatData})
//   }
//   componentDidMount() {
//     this.getData().then(()=> {
//       var accessToRef = d3.select(this.myRef.current)
//         .append("svg")
//         .attr('width',width)
//         .attr('height',height)
//         .style('background-color','#ccc')
//         .style('pedding',10)
//         .style('margin-left',5);
//       // accessToRef.style("background-color","red");
//       accessToRef.selectAll('react') // //[12,36,4,25,37,10,20])
//         .data(this.state.data)
//         .enter()
//         .append("rect")
//         .attr("x",(d,i) => i * 30)
//         .attr("y",(d,i) => height - 10 * d)
//         .attr("width",25)
//         .attr("height",(d,i) => d*10)
//         .attr('fill','tomato')
//       });     
//   }

//   render() {
//     return <div ref={this.myRef}></div>
//   }
// }

// export default FirstChartArea;
import React, { useState, useEffect }  from 'react';
import axiosApi from './../../api/axiosApi';
import Chart from './Chart'; 
const BarChartOrders = () => {
  const [ dataChart, setDataChart ] = useState([]);
  const getData = async () => {
    const {data} = await axiosApi.get('/getLastTwoWeekOrders');
    const chatData = data.data.map(item => item.quantity)
    setDataChart(chatData);
  }
  useEffect(() => {
    getData();
  }, []);
  if(dataChart){
    return (
      <Chart data={dataChart} type="Bar"/>
    );
  } 
  return <h1>Loading......</h1>
}
export default BarChartOrders;