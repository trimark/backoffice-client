var royaltiesSettingsController = function ($scope, $location, $royaltiesSettingsFactory) {
	console.log(">royaltiesSettingsController: $royaltiesSettingsFactory=" + $royaltiesSettingsFactory.columns)
	this.settings = $royaltiesSettingsFactory;

  this.onClickedCreate = function(){
    //console.log(">onClickedCreate");
    $location.path('/royalties-report');
    //console.log("<onClickedCreate");
  }
  this.onClickedCancel = function(){
    //console.log(">onClickedCancel");
    //console.log("<onClickedCancel");
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
}
angular.module('trimark-backoffice').controller("RoyaltiesSettingsCtrl", ["$rootScope", "$location", "RoyaltiesSettingsFactory",  royaltiesSettingsController]);
