var gameHistorySettingsController = function ($scope, $location, $gameHistorySettingsFactory, $timeout, $q) {
	console.log(">gameHistorySettingsController: $gameHistorySettingsFactory=" + $gameHistorySettingsFactory.columns)
	this.settings = $gameHistorySettingsFactory;
	this.organizations = ["Brand AA1", "Brand AA2", "Brand AA3"];
	this.groupings = ["None", "Game"];
	this.periodPreset = null;
	this.periodStartDate = null;
	this.periodEndDate = null;

	var today = new Date();
	var minDate = new Date(2010,1,1);
	
	this.onClosePeriod = function(){
		console.log(">onClosePeriod: period=" + this.periodPreset);
		if (this.periodPreset !=null){
			switch (this.periodPreset){
				case "last7days":
				this.periodEndDate = today;
				this.periodStartDate =new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
				break;
				case "thisMonth":
				this.periodEndDate = today;
				this.periodStartDate =new Date(today.getFullYear(), today.getMonth(), 1);
				break;
				case "last3Months":
				this.periodEndDate = today;
				this.periodStartDate =new Date(today.getFullYear(), today.getMonth()-3, 1);
				break;
				case "thisYear":
				this.periodEndDate = today;
				this.periodStartDate =new Date(today.getFullYear(), 0, 1);
				break;
				case "lastYear":
				this.periodEndDate = new Date (today.getFullYear()-1, 11,31);
				this.periodStartDate =new Date(today.getFullYear()-1, 0, 1);
				break;
				default: throw ("Unhandled value for periodPreset: " + this.periodPreset)
			}
			console.log ("periodStartDate=" + this.periodStartDate);
			this.settings.endDate = this.periodEndDate;
			this.settings.startDate = this.periodStartDate;
		}
		console.log("<onClosePeriod: periodStartDate=" + this.periodStartDate+ ", periodEndDate" + this.periodEndDate);
	}
	this.getMaxStartDate = function(){
		if (this.settings.endDate!=null){
			this.refreshPeriod();
			return this.settings.endDate;
		} else {
			return today;
		}
	}
	this.getMinEndDate = function(){
		if (this.settings.startDate!=null){
			this.refreshPeriod();
			return this.settings.startDate;
		} else {
			return minDate;
		}
	}
	this.getMaxEndDate = function(){
		return today;
	}
	this.refreshPeriod = function(){
		console.log
		if (this.settings.startDate!=this.periodStartDate || this.settings.endDate != this.periodEndDate){
			this.periodPreset = null;
		}
	}
	this.onClickedCreate = function(){
		console.log(">onClickedCreate");
	   	$location.path('/gamehistory-report');
		console.log("<onClickedCreate");
	}
	this.onClickedSelect = function(){
		// console.log(">onClickedSelect: this.selectedItem.value=" + this.selectedItem.value);
		var usr = null;
		for (var i = 0; i<dummyUsers.length; i++){
				if (dummyUsers[i][0] == this.selectedItem.value){
					usr = dummyUsers[i];
				}
		}
		// console.log("usr=" + usr);
		this.settings.selectedUser = {userId: usr[0], firstName: usr[1], lastName:usr[2], phone:usr[3], email:usr[4]};
		// console.log("<onClickedSelect");
	}
	this.toggle = function (item, list) {
		//console.log(">toggle: item=" + item + ",list=" + list)
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(item);
		}
		//console.log("<toggle");
	};
	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};



    var self = this;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
 		// console.log(">querySearch: self.settings.organization=" + self.settings.organization)
      var results = query ? self.states[self.settings.organization].filter( createFilterFor(query) ) : self.states[self.settings.organization];
      var deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {

      var usersPerOrganization = {};
      for (var i = 0; i<self.organizations.length; i++){
      	usersPerOrganization[self.organizations[i]] = [];
      	//console.log("usersPerOrganization["+self.organizations[i]+"]=" + usersPerOrganization[self.organizations[i]])
      }
      var ix=0
      for (var i = 0; i<dummyUsers.length; i++){
      		var usr = dummyUsers[i][0];
      		var org = self.organizations[ix]
      		//console.log("usr=" + usr + ", org=" + org);
      		usersPerOrganization[org].push({value: usr, display:usr});
      		//console.log("usersPerOrganization["+ org +"]="+usersPerOrganization[org])
      		ix++;
      		if (ix >= self.organizations.length){
      			ix=0;
      		}
      }
      // for (var p in usersPerOrganization){
      // 	console.log("usersPerOrganization["+p+"]=" + usersPerOrganization[p])
      // }
      return usersPerOrganization;


      // var allUsers = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
      //         Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
      //         Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
      //         Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
      //         North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
      //         South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
      //         Wisconsin, Wyoming';

      // return allUsers.split(/, +/g).map( function (state) {
      //   return {
      //     value: state.toLowerCase(),
      //     display: state
      //   };
      // });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
   	};

    
  }
}
angular.module('trimark-backoffice').controller("GameHistorySettingsCtrl", ["$rootScope", "$location", "GameHistorySettingsFactory", "$timeout", "$q",  gameHistorySettingsController]);
