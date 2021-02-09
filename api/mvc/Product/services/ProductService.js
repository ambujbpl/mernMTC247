let q = require('q');
let _ = require('underscore');
let Products =  require('../../../models/products');
let Orders =  require('../../../models/orders');
let Sales = require('../../../models/sales');
let moment = require('moment');

function ProductsService() {
  /**
   * Creates a product.
   *
   * @class      CreateProduct (name)
   * @param      {<type>}  product  The product
   * @return     {<type>}  { description_of_the_return_value }
   */
	function CreateProduct(product) {
		let deferred =  q.defer();
		Products.create(product).then(function(response) {
			deferred.resolve(response);
		}).catch(function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

  /**
   * Gets the products.
   *
   * @class      GetProducts (name)
   * @return     {<type>}  The products.
   */
  function GetProducts() {
    let deferred =  q.defer();
    Products.find().select(['_id','name','amount']).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Creates an order.
   *
   * @class      CreateOrder (name)
   * @param      {<type>}  order   The order
   * @return     {<type>}  { description_of_the_return_value }
   */
  function CreateOrder(order) {
    let deferred =  q.defer();
    Products.find({_id:order.product}).then(function(response) {
      if(response.length > 0){
        order.amount = parseInt(order.quantity || 1) * parseInt(response[0].amount);        
        Orders.create(order).then(function(response) {
          deferred.resolve(response);
        })
      } else {
        deferred.reject('Product not found');  
      }
    })
    .catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Gets the orders.
   *
   * @class      GetOrders (name)
   * @return     {<type>}  The orders.
   */
  function GetOrders() {
    let deferred =  q.defer();
    Orders.find().select(['_id']).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Creates a sale.
   *
   * @class      CreateSale (name)
   * @param      {<type>}  sale    The sale
   * @return     {<type>}  { description_of_the_return_value }
   */
  function CreateSale(sale) {
    let deferred =  q.defer();
    Orders.find({_id:sale.order}).then(function(response) {
        if(response.length > 0){
        sale.amount = response[0].amount;        
        Sales.create(sale).then(function(response) {
          deferred.resolve(response);
        })
      } else {
        deferred.reject('Order not found');  
      }
    })
    .catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  /**
   * Gets the last two week orders.
   *
   * @class      GetLastTwoWeekOrders (name)
   * @return     {<type>}  The last two week orders.
   */
	function GetLastTwoWeekOrders() {
		let deferred =  q.defer();
		dateTo = moment().format('YYYY-MM-DD');
    dateFrom = moment().subtract(14,'d').format('YYYY-MM-DD');
    // console.log('dateTo : ',dateTo);
    // console.log('dateFrom : ',dateFrom);
		Orders.find({created_at:{$gte:dateFrom,$lt:dateTo}}).populate('product').sort({ created_at:1 }).then(function(response) {
			deferred.resolve(response);
		}).catch(function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

  /**
   * Gets the last week sales.
   *
   * @class      GetLastWeekSales (name)
   * @return     {<type>}  The last week sales.
   */
	function GetLastWeekSales() {
		let deferred =  q.defer();
    dateTo = moment().format('YYYY-MM-DD');
    dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
		Sales.find({created_at:{$gte:dateFrom,$lt:dateTo}}).then(function(response) {
			deferred.resolve(response);
		}).catch(function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

  /**
   * Gets the second last week sales.
   *
   * @class      GetSecondLastWeekSales (name)
   * @return     {<type>}  The second last week sales.
   */
  function GetSecondLastWeekSales() {
    let deferred =  q.defer();
    dateTo = moment().subtract(7,'d').format('YYYY-MM-DD');
    dateFrom = moment().subtract(14,'d').format('YYYY-MM-DD');
    Sales.find({created_at:{$gte:dateFrom,$lt:dateTo}}).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  /**
   * Gets the last week orders.
   *
   * @class      GetLastWeekOrders (name)
   * @return     {<type>}  The last week orders.
   */
  function GetLastWeekOrders() {
    let deferred =  q.defer();
    dateTo = moment().format('YYYY-MM-DD');
    dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
    Orders.find({created_at:{$gte:dateFrom,$lt:dateTo}}).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  /**
   * Gets the second last week orders.
   *
   * @class      GetSecondLastWeekOrders (name)
   * @return     {<type>}  The second last week orders.
   */
  function GetSecondLastWeekOrders() {
    let deferred =  q.defer();
    dateTo = moment().subtract(7,'d').format('YYYY-MM-DD');
    dateFrom = moment().subtract(14,'d').format('YYYY-MM-DD');
    Orders.find({created_at:{$gte:dateFrom,$lt:dateTo}}).then(function(response) {
      deferred.resolve(response);
    }).catch(function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

 return {
	CreateProduct,
  GetProducts,
  CreateOrder,
  GetOrders,
  CreateSale,
	GetLastTwoWeekOrders,
	GetLastWeekSales,
  GetSecondLastWeekSales,
  GetLastWeekOrders,
  GetSecondLastWeekOrders
 };
}
module.exports = ProductsService();