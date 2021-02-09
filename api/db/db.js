var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/onlinestore', {
	// useMongoClient: true  
}).then(()=>{console.log('Mongo DB connected');});

// mongoexport --db onlinestore --collection sales --out sales.json
// mongoexport --db onlinestore --collection orders --out orders.json
// mongoexport --db onlinestore --collection products --out products.json
