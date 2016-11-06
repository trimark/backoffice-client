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






  $scope.columns = ["Distributor", "Operator", "Brand", "Player Count", "Bet Count", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"];
  $scope.selectedColumns = ["Distributor", "Operator", "Brand", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"];
  $scope.summaryData = ["Distributor", "Operator", "Brand", "Player Count", "Bet Count", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"];
  $scope.selectedSummaryData = ["Distributor", "Operator", "Brand", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"];

  $scope.toggle = function (item, list) {
    console.log(">toggle: item=" + item + ",list=" +list)
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
    console.log("<toggle");
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isIndeterminate = function() {
    return ($scope.selectedColumns.length !== 0 &&
        $scope.selectedColumns.length !== $scope.columns.length);
  };

  $scope.isChecked = function() {
    return $scope.selectedColumns.length === $scope.columns.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selectedColumns.length === $scope.columns.length) {
      $scope.selectedColumns = [];
    } else if ($scope.selectedColumns.length === 0 || $scope.selectedColumns.length > 0) {
      $scope.selectedColumns = $scope.columns.slice(0);
    }
  };
  $scope.showSummary = true;

	self.init();
}

angular.module('trimark-backoffice').controller("RoyaltiesSettingsCtrl", ["$rootScope", royaltiesSettingsController]);