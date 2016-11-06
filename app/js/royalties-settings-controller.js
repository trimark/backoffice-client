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
  selected: true,
  label: 'Lottery',
  children: [
    {label: 'EuroMillions'},
    {label: 'Powerball'}
  ]
},{
  selected: true,
  label: 'ScratchCards',
  children: [
    {label: 'The Amazing Circus'},
    {label: 'Astro'},
    {label: 'Beauty Salon'},
    {label: 'Geisha Memoirs'},
    {label: 'Genie´s Gold'},
    {label: 'Haunted Mansion'},
    {label: 'Hillbilly Haven'},
    {label: 'Jester´s Gold'},
    {label: 'Knights of Atlantis'},
    {label: 'Mermaids and Pearls'},
    {label: 'Nefertiti´s Fortune'},
    {label: 'Pirate´s Treasure Trove'},
    {label: 'Rockstar Riches'},
    {label: 'Shopping Spree'},
    {label: 'Sky Kingdom'},
    {label: 'Tiki Treasure'},
    {label: 'Sassy Sevens'},
    {label: 'Wicked Witch'},
    {label: 'Astro'},
    {label: 'Astro'}
  ]
},{
  selected: true,
  label: 'Slots',
  children: [
    {label: 'Dwarves & Dragons'},
    {label: 'Funhouse'}
  ]
}];
$scope.games = self.games;

self.organizations = [{
  selected: true,
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