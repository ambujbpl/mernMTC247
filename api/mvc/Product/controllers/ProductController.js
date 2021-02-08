let _ = require('underscore');
let ProductService = require('../services/ProductService');

module.exports = {
  /**
   * Creates a product.
   *
   * @class      CreateProduct (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
	CreateProduct: function (req, res) {
		ProductService.CreateProduct(req.body).then(function (result) {
			return res.json(result);
		}).catch(function (error) {
			return res.json(error);
		});
	},

  /**
   * Gets the products.
   *
   * @class      GetProducts (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
  GetProducts: function (req, res) {
    ProductService.GetProducts().then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      return res.json(error);
    });
  },

  /**
   * Creates an order.
   *
   * @class      CreateOrder (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
  CreateOrder: function (req, res) {
    ProductService.CreateOrder(req.body).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      return res.json(error);
    });
  },

  /**
   * Gets the orders.
   *
   * @class      GetOrders (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
  GetOrders: function (req, res) {
    ProductService.GetOrders().then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      return res.json(error);
    });
  },

  /**
   * Creates a sale.
   *
   * @class      CreateSale (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
  CreateSale: function (req, res) {
    ProductService.CreateSale(req.body).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      return res.json(error);
    });
  },

  /**
   * Gets the last two week orders.
   *
   * @class      GetLastTwoWeekOrders (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
	GetLastTwoWeekOrders: function (req, res){
		ProductService.GetLastTwoWeekOrders().then(function(result){
      let finalProductCount = [];
      result.forEach(obj => {
        if(obj.product){
          let data = _.find(finalProductCount, function(Item){ return Item.name === obj.product.name; });
          if(data){
            data.quantity = data.quantity + parseInt(obj.quantity); 
          } else {
            finalProductCount.push({
              quantity: parseInt(obj.quantity),
              name: obj.product.name,
              id: obj._id          
            })
          }
        }
      })
      finalProductCount = _.sortBy(finalProductCount, 'quantity').reverse().slice(0, 20);
			return res.json({success:true,message:'Last Two Weeks Procuts Order Counts',data:finalProductCount});
		}).catch(function(error){
			console.log(error)
			return res.json({success:false,message:'Error in processing',data:error});
		});
	},

  /**
   * Gets the last week sales.
   *
   * @class      GetLastWeekSales (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
	GetLastWeekSales: function (req, res){
		let week_date = {};
		let resp = {
			success:true,
			message:'Details Gets Successfully',
			data:{}
		};
		ProductService.GetLastWeekSales().then(function(current_weeks){
      let dummy_data = _.groupBy(current_weeks, "created_at");
      var total_current = 0;
      let new_arr = [];
       _.mapObject(dummy_data,function(val,key){
         let total_amt = 0;
         let plucked_amt = _.pluck(val,'amount');
         plucked_amt.forEach(function(amt){
           total_amt =  total_amt+ parseInt(amt);
         });
         new_arr.push(total_amt);
       });

      current_weeks = new_arr.map(ele => {
        total_current += parseInt(ele);
      });
      resp.data.current_weeks = new_arr;
      resp.data.current_weeks_total = total_current;
			return ProductService.GetSecondLastWeekSales();
		}).then(function(previous_weeks){
			// resp.data.previous_weeks = previous_weeks;
      var total_previous = 0;
      previous_weeks.map(ele => {
        total_previous += parseInt(ele.amount);
      });
      resp.data.total_previous = total_previous;
      resp.data.percentage_of_increase_or_decrese = (resp.data.current_weeks_total - resp.data.total_previous) * .01;
			return res.json(resp);
		}).catch(function(error){
			return res.json({success:false,message:'Error in processing',data:error});
		});
	},

  /**
   * Gets the last week orders.
   *
   * @class      GetLastWeekOrders (name)
   * @param      {<type>}  req     The request
   * @param      {<type>}  res     The resource
   */
  GetLastWeekOrders: function (req, res){
    let week_date = {};
    let resp = {
      success:true,
      message:'Details Gets Successfully',
      data:{}
    };
    ProductService.GetLastWeekOrders().then(function(current_weeks){
      console.log('current_weeks : ',current_weeks)
      let dummy_data = _.groupBy(current_weeks, "created_at");
      var total_current = 0;
      let new_arr = [];
       _.mapObject(dummy_data,function(val,key){
         let total_amt = 0;
         let plucked_amt = _.pluck(val,'quantity');
         plucked_amt.forEach(function(amt){
           total_amt =  total_amt+ parseInt(amt);
         });
         new_arr.push(total_amt);
       });

      current_weeks = new_arr.map(ele => {
        total_current += parseInt(ele);
      });
      resp.data.current_weeks = new_arr;
      resp.data.current_weeks_total = total_current;
      return ProductService.GetSecondLastWeekOrders();
    }).then(function(previous_weeks){
      var total_previous = 0;
      previous_weeks.map(ele => {
        total_previous += parseInt(ele.amount);
      });
      resp.data.total_previous = total_previous;
      resp.data.percentage_of_increase_or_decrese = (resp.data.current_weeks_total - resp.data.total_previous) * .01;
      return res.json(resp);
    }).catch(function(error){
      return res.json({success:false,message:'Error in processing',data:error});
    });
  },
};