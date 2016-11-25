var toastController = function($scope, params, $mdToast)
{
	var self = this;

	$scope.params = params;

	$scope.closeToast = function() {
		$mdToast.hide();
	};

};

angular.module('trimark-backoffice').controller("ToastCtrl", ["$scope", "params", "$mdToast", toastController]);