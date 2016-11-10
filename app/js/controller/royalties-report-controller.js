var dummyData = null;
var winPercFeed = [0.87612, 0.93132, 0.83565, 0.916298, 0.763467, 0.83421, 0.98475, 0.87503, 0.90211,  0.89976] ;
var winPercFeedIX = 0;
var betFeed1 = [3582, 8458, 7335, 1843, 9475, 6584, 2854, 4844, 5229, 3284, 5343];
var betFeed1IX = 0;
var betFeed2 = [358, 458, 335, 843, 475, 584, 854, 844, 229, 284, 654, 345, 234, 567, 345, 456, 434];
var betFeed2IX = 0;

function formatCurrency(amount, c, d, t){
var n = amount, 
    c = isNaN(c = Math.abs(c)) ? 0 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 function formatPercentage(val){
	return Math.round(val * 100).toString() + "%";
 }
function getWin(win){
	winPercFeedIX++;
	if (winPercFeedIX >= winPercFeed.length){
		winPercFeedIX = 0;
	}
	return Math.round (win * winPercFeed[winPercFeedIX]);
}
function getBet(){
	betFeed1IX++;
	if (betFeed1IX >= betFeed1.length){
		betFeed1IX = 0;
		betFeed2IX++;
		if (betFeed2IX >= betFeed2.length){
			betFeed2IX = 0;
		}
	}
	return betFeed1[betFeed1IX] * betFeed2[betFeed2IX];
}
function getGamesArray(gamesTree, selectedOnly){
	console.log(">getGamesArray: ");
	var ret = [];
	for (var i = 0; i<gamesTree.length;i++){
		var categoryName = gamesTree[i].label;
		var children = gamesTree[i].children;
		for (var j = 0; j<children.length; j++){
			var game = children[j];
			
			var add = true;
			//console.log("game.selected=" + game.selected);
			if (selectedOnly){
				
				if(!game.selected){
					add = false;
				}
			}
			if (add){
				ret.push(game.label);
			}
		}
	}
	console.log("<getGamesArray: ret=" +ret);
	return ret;
}

function getDataRowString(row){
	return "{brand: " + row.brand	+ ", game: " + row.game  + ", bets: " + row.bets + ", wins: " + row.wins + ", net: " + row.net + " , royaltyPercentage: " + row.royaltyPercentage + ", royaltyAmount: " + row.royaltyAmount +" , distSharePercentage: " + row.distSharePercentage + ", distShareAmount: " + row.distShareAmount +" , vendorSharePercentage: " + row.vendorSharePercentage + ", vendorShareAmount: " + row.vendorShareAmount + "}";
}
function generateDummyData(settings){
	console.log(">generateDummyData: settings=" + settings);
	dummyData = [];
	var brandNames = [
	{brand: "Brand AA1", operator: "Operator AA", distributor: "Distributor A"},
	{brand: "Brand AA2", operator: "Operator AA", distributor: "Distributor A"},
	{brand: "Brand AA3", operator: "Operator AA", distributor: "Distributor A"},
	{brand: "Brand AB1", operator: "Operator AB", distributor: "Distributor A"},
	{brand: "Brand AB2", operator: "Operator AB", distributor: "Distributor A"},
	{brand: "Brand AB3", operator: "Operator AB", distributor: "Distributor A"},
	{brand: "Brand AC1", operator: "Operator AC", distributor: "Distributor A"},
	{brand: "Brand AC2", operator: "Operator AC", distributor: "Distributor A"},
	{brand: "Brand AC3", operator: "Operator AC", distributor: "Distributor A"},
	{brand: "Brand BA1", operator: "Operator BA", distributor: "Distributor B"}, 
	{brand: "Brand BA2", operator: "Operator BA", distributor: "Distributor B"},
	{brand: "Brand BA3", operator: "Operator BA", distributor: "Distributor B"},
	{brand: "Brand BB1", operator: "Operator BB", distributor: "Distributor B"},
	{brand: "Brand BB2", operator: "Operator BB", distributor: "Distributor B"}
	];

	var gameNames = getGamesArray(settings.games, false);
	console.log("gameNames=" + gameNames);
	for (var i = 0; i<brandNames.length; i++){
		var brand = brandNames[i].brand;
		var operator = brandNames[i].operator;
		var distributor = brandNames[i].distributor;
		for (var j = 1; j < gameNames.length; j++){
			var game = gameNames[j];
			var bets = getBet();
			var wins = getWin(bets);
			var net = bets-wins;
			var royaltyPercentage = 0.07;
			var royaltyAmount = Math.round(net * royaltyPercentage);
			var distSharePercentage = 0.02;
			var distShareAmount = Math.round(net * distSharePercentage);
			var vendorSharePercentage = 0.05;
			var vendorShareAmount = Math.round(net * vendorSharePercentage);
			var row = 
			{
				distributor: distributor,  
				operator: operator, 
				brand: brand, 
				game: game, 
				bets: formatCurrency(bets), 
				wins: formatCurrency(wins), 
				net: formatCurrency(net), 
				royaltyPercentage: formatPercentage(royaltyPercentage), 
				royaltyAmount: formatCurrency(royaltyAmount), 
				distSharePercentage:  formatPercentage(distSharePercentage), 
				distShareAmount: formatCurrency(distShareAmount), 
				vendorSharePercentage:  formatPercentage(vendorSharePercentage), 
				vendorShareAmount: formatCurrency(vendorShareAmount),
				numberOfPlayers: 17,
				numberOfBets: 43
			}
			//console.log(getDataRowString(row));
			dummyData.push(row);
		}
	}
	console.log("<generateDummyData: settings=" + settings);
}
var royaltiesReportController = function ($scope, $location, $royaltiesSettingsFactory) {
	console.log(">royaltiesReportController: dummyData=" + dummyData);
	
	this.settings = $royaltiesSettingsFactory;
	
		if (dummyData == null){
			generateDummyData(this.settings);
		}
		this.data = dummyData;
		var games = getGamesArray(this.settings.games, true);
		
		for (var i = 0; i<this.data.length;i++){
			var row = this.data[i];
			var rowMatches = true;
			//if (this.settings.
		}

	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};
}
angular.module('trimark-backoffice').controller("RoyaltiesReportCtrl", ["$rootScope", "$location", "RoyaltiesSettingsFactory",  royaltiesReportController]);
