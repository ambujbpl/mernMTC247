'use strict';
var mongoose = require('mongoose');
var ProductsSchema = new mongoose.Schema({
	name: { type: String, default: 'NA' },
	amount: { type: String, default: 'NA' },
	created_at: { type: Date, default: Date.now}
});
module.exports = mongoose.model('products', ProductsSchema);