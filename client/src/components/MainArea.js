import React from 'react';
import FirstChartArea from './FirstChartArea';
import LineChartSales from './LineChartSales';
import LineChartOrders from './LineChartOrders';
const MainArea = () => {
	return (
		<div className="row">
			<div className="col s6">				
				<FirstChartArea />
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