let q = require('q');
let _ = require('underscore');
let Products =  require('../../../models/products');
function UtilsService() {

	function getLastTwoWeeksDates() {
		let deferred =  q.defer();
		let curr = new Date; 
		let first = curr.getDate() - curr.getDay(); 
		let pastMonth =  curr.getMonth() +1;
		let FirstDayWeek = new Date();
		let LastDayweek = new Date();
		let LastDate = LastDayweek.getDate() - 6;
		LastDayweek.setDate(LastDate);

		let FirstSecondLastWeek =  new Date();
		let FirstSecondLastDate = FirstSecondLastWeek.getDate() - 7;
		FirstSecondLastWeek.setDate(FirstSecondLastDate);
		let SecondLastDayWeek = new Date();
		let pastDate1 = SecondLastDayWeek.getDate() - 13;
		SecondLastDayWeek.setDate(pastDate1);

		let week_details = {
			firstDayWeek:FirstDayWeek,
			LastDayweek:LastDayweek,
			FirstSecondLastWeek:FirstSecondLastWeek,
			SecondLastDayWeek:SecondLastDayWeek
		};
		deferred.resolve(week_details);
		return deferred.promise;
	};
    

 return {
	getLastTwoWeeksDates:getLastTwoWeeksDates
 };
}
module.exports = UtilsService();