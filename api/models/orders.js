'use strict';
var mongoose = require('mongoose');
var OrdersSchema = new mongoose.Schema({
	amount:{type:String,default:'0'},
	product: { type: mongoose.Schema.ObjectId, ref: 'products' }, 
  quantity:{type: String, default: '1'},
	created_at: { type: Date, default: Date.now}
});
module.exports = mongoose.model('orders', OrdersSchema);