var royaltiesSettingsController = function($scope)
{
	var self = this;
	self.userName = "";
	self.password = "";
	self.organization = null;
	self.organizations = null;

	this.init = function()
	{

	};
	self.games = [{
  label: 'Hats',
  children: [
    {label: 'Flat cap'},
    {label: 'Top hat'},
    {label: 'Gatsby'}
  ]
},{
  label: 'Pens',
  selected: true,
  children: [
    {label: 'Fountain'},
    {label: 'Gel ink'},
    {label: 'Fedora'},
    {label: 'Baseball', selected: true},
    {label: 'Roller ball'},
    {label: 'Fiber tip'},
    {label: 'Ballpoint'}
  ]
},{
  label: 'Whiskey',
  children: [
    {label: 'Irish'},
    {label: 'Scotch'},
    {label: 'Rye'},
    {label: 'Tennessee'},
    {label: 'Bourbon'}
  ]
}];
$scope.games = self.games;

self.organizations = [{
  label: 'Distributor',
  children: [
    {
      label: 'Operator A',
      children: [
        {label: 'Brand A1'},
        {label: 'Brand A2'},
        {label: 'Brand A3'}
      ]
    },
    {
      label: 'Operator B',
      children: [
        {label: 'Brand B1'},
        {label: 'Brand B2'},
        {label: 'Brand B3'}
      ]
    },
   {
      label: 'Operator C',
      children: [
        {label: 'Brand C1'},
        {label: 'Brand C2'},
        {label: 'Brand C3'}
      ]
    }
  ]
}]
$scope.organizations = self.organizations;






$scope.items = [1,2,3,4,5];
  $scope.selected = [1];
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.items.length);
  };

  $scope.isChecked = function() {
    return $scope.selected.length === $scope.items.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.items.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.items.slice(0);
    }
  };

	self.init();
}

angular.module('trimark-backoffice').controller("RoyaltiesSettingsCtrl", ["$rootScope", royaltiesSettingsController]);