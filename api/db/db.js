var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/onlinestore', {
	// useMongoClient: true  
}).then(()=>{console.log('Mongo DB connected');});
