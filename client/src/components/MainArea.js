import React from 'react';
import BarChartOrders from './chart/BarChartOrders';
import LineChartSales from './chart/LineChartSales';
import LineChartOrders from './chart/LineChartOrders';
const MainArea = () => {
	return (
		<div className="row">
			<div className="col s6">				
				<BarChartOrders />
			</div>
			<div className="col s3">
				<LineChartSales />
			</div>
      <div className="col s3">
        <LineChartOrders />
      </div>
		</div>		
	);
}

export default MainArea;