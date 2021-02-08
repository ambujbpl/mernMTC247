var mongoose = require('mongoose');
var SalesSchema = new mongoose.Schema({
	order: { type: mongoose.Schema.ObjectId, ref: 'orders' },
  amount: { type: String, default: 'NA' },
	created_at: { type: Date, default: Date.now}
});
module.exports = mongoose.model('sales', SalesSchema);