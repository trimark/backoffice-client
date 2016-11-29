

var gamehistoryReportController = function ($scope, $location, $gameHistorySettingsFactory) {
	console.log(">gamehistoryReportController");
	var dummyData = null;
	var winPercFeed = [0.87612, 0.93132, 0.83565, 0.916298, 0.763467, 0.83421, 0.98475, 0.87503, 0.90211, 0.89976];
	var winPercFeedIX = 0;
	var betFeed1 = [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2];
	var betFeed1IX = 0;
	var betFeed2 = [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1];
	var betFeed2IX = 0;

	function formatCurrency(amount, c, d, t) {
		var n = amount,
		c = isNaN(c = Math.abs(c)) ? 0 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
		return "€" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
	function formatDate(d) {
		return d.toDateString();
	}
	function formatPercentage(val) {
		return Math.round(val * 100).toString() + "%";
	}
	function getWin(bet, winPerc) {
		return Math.round(bet * winPerc);
	}
	function getBet() {
		betFeed1IX++;
		if (betFeed1IX >= betFeed1.length) {
			betFeed1IX = 0;
			betFeed2IX++;
			if (betFeed2IX >= betFeed2.length) {
				betFeed2IX = 0;
			}
		}
		return betFeed1[betFeed1IX] * betFeed2[betFeed2IX];
	}
	function getGamesArray(gamesTree, selectedOnly) {
		console.log(">getGamesArray: ");
		var ret = [];
		for (var i = 0; i < gamesTree.length; i++) {
			var categoryName = gamesTree[i].label;
			var children = gamesTree[i].children;
			for (var j = 0; j < children.length; j++) {
				var game = children[j];

				var add = true;
				//console.log("game.selected=" + game.selected);
				if (selectedOnly) {

					if (!game.selected) {
						add = false;
					}
				}
				if (add) {
					ret.push(game.label);
				}
			}
		}
		console.log("<getGamesArray: ret=" + ret);
		return ret;
	}

	function getGamesChipsArray(gamesTree, selectedOnly) {
		var ret = [];
		for (var i = 0; i < gamesTree.length; i++) {
			var category = gamesTree[i];
			var categoryName = gamesTree[i].label;
			var add = true;
			//console.log("game.selected=" + game.selected);
			if (selectedOnly) {

				if (!category.selected) {
					add = false;
				}
			}
			if (add) {
				ret.push(category.label);
			} else {
				var children = gamesTree[i].children;
				for (var j = 0; j < children.length; j++) {
					var game = children[j];

					var add = true;
					//console.log("game.selected=" + game.selected);
					if (selectedOnly) {

						if (!game.selected) {
							add = false;
						}
					}
					if (add) {
						ret.push(game.label);
					}
				}
			}
		}
		return ret;
	}
	function getGameType(gameName){
		var ret = "";
		switch (gameName){
			case "EuroMillions":
			case "Powerball":
				ret = "Lottery";
			break;
			case "The Amazing Circus":
			case "Astro":
			case "Beauty Salon":
			case 'Geisha Memoirs':
			case 'Genie\'s Gold':
			case 'Haunted Mansion':
			case 'Hillbilly Haven':
			case 'Jester\'s Gold':
			case 'Knights of Atlantis':
			case 'Mermaids and Pearls':
			case 'Nefertiti\'s Fortune':
			case 'Pirate\'s Treasure Trove':
			case 'Rockstar Riches':
			case 'Shopping Spree':
			case 'Sky Kingdom':
			case 'Tiki Treasure':
			case 'Sassy Sevens':
			case 'Wicked Witch':
				ret = "Scratch card";
			break;
			case 'Dwarves & Dragons':
			case 'Funhouse':
				ret = "Slot"
		}
		return ret;
	}
	function getBrandsArray(organizationTree, selectedOnly) {
		console.log(">getBrandsArray: ");
		var ret = [];
		for (var i = 0; i < organizationTree.length; i++) {
			var operators = organizationTree[i].children;
			for (var j = 0; j < operators.length; j++) {
				var operator = operators[j];
				for (var k = 0; k < operator.children.length; k++) {
					var brand = operator.children[k];
					var add = true;
					if (selectedOnly) {

						if (!brand.selected) {
							add = false;
						}
					}
					if (add) {
						ret.push(brand.label);
					}
				}
			}
		}
		console.log("<getBrandsArray: ret=" + ret);
		return ret;
	}
	function getOrganizationsArray(organizationTree, selectedOnly) {
		console.log(">getOrganizationsArray: ");
		var ret = [];
		for (var i = 0; i < organizationTree.length; i++) {
			var distributor = organizationTree[i];
			debug("distributor=" + distributor.label);
			debug("distributor.selected=" + distributor.selected);
			var add = true;
			if (selectedOnly) {
				if (!distributor.selected) {
					add = false;
				}
			}
			if (add) {
				ret.push(distributor.label);
				debug("added: " + distributor.label);
			} else {
				var operators = organizationTree[i].children;
				for (var j = 0; j < operators.length; j++) {
					var operator = operators[j];
					var add = true;
					if (selectedOnly) {

						if (!operator.selected) {
							add = false;
						}
					}
					if (add) {
						ret.push(operator.label);
					} else {
						for (var k = 0; k < operator.children.length; k++) {
							var brand = operator.children[k];
							var add = true;
							if (selectedOnly) {

								if (!brand.selected) {
									add = false;
								}
							}
							if (add) {
								ret.push(brand.label);
							}
						}
					}
				}
			}
		}
		console.log("<getOrganizationsArray: ret=" + ret);
		return ret;
	}

	function getDataRowString(row) {
		return "{brand: " + row.brand + ", game: " + row.game + ", bets: " + row.bets + ", wins: " + row.wins + ", net: " + row.net + " , royaltyPercentage: " + row.royaltyPercentage + ", royaltyAmount: " + row.royaltyAmount + " , distSharePercentage: " + row.distSharePercentage + ", distShareAmount: " + row.distShareAmount + " , vendorSharePercentage: " + row.vendorSharePercentage + ", vendorShareAmount: " + row.vendorShareAmount + "}";
	}
	function generateDummyData(settings) {
		console.log(">generateDummyData: settings=" + settings);
		dummyData = [];
		var brandNames = [{
				brand : "Brand AA1",
				operator : "Operator AA",
				distributor : "Distributor A"
			}, {
				brand : "Brand AA2",
				operator : "Operator AA",
				distributor : "Distributor A"
			}, {
				brand : "Brand AA3",
				operator : "Operator AA",
				distributor : "Distributor A"
			}, {
				brand : "Brand AB1",
				operator : "Operator AB",
				distributor : "Distributor A"
			}, {
				brand : "Brand AB2",
				operator : "Operator AB",
				distributor : "Distributor A"
			}, {
				brand : "Brand AB3",
				operator : "Operator AB",
				distributor : "Distributor A"
			}, {
				brand : "Brand AC1",
				operator : "Operator AC",
				distributor : "Distributor A"
			}, {
				brand : "Brand AC2",
				operator : "Operator AC",
				distributor : "Distributor A"
			}, {
				brand : "Brand AC3",
				operator : "Operator AC",
				distributor : "Distributor A"
			}, {
				brand : "Brand BA1",
				operator : "Operator BA",
				distributor : "Distributor B"
			}, {
				brand : "Brand BA2",
				operator : "Operator BA",
				distributor : "Distributor B"
			}, {
				brand : "Brand BA3",
				operator : "Operator BA",
				distributor : "Distributor B"
			}, {
				brand : "Brand BB1",
				operator : "Operator BB",
				distributor : "Distributor B"
			}, {
				brand : "Brand BB2",
				operator : "Operator BB",
				distributor : "Distributor B"
			}
		];

		var allGames = getGamesArray(settings.games, false);
		var gameNames = [];
		var usrId = settings.selectedUser.userId;
		// debug ("test normalization -length = " + usrId.length)
		// for (var i = 0; i<usrId.length*3; i++){
		// 	var ix = i % usrId.length;
		// 	debug ("i=" + i + ", normalized=" + ix)
		// }
		for (var i = 0; i<usrId.length; i++){
			var charCode = usrId.charCodeAt(i);
			var ix = charCode % allGames.length;
			var gn = allGames[ix];
			if (!exists(gn, gameNames)){
				gameNames.push(gn)
			}
		}
		debug("gameNames = " + gameNames)
		console.log("this.settings.organization=" + settings.organization);
		for (var i = 0; i<brandNames.length; i++){
			debug("checking " + brandNames[i].brand + " <> " + settings.organization)
			if (brandNames[i].brand == settings.organization){
				var brand = brandNames[i].brand;
				var operator = brandNames[i].operator;
				var distributor = brandNames[i].distributor;
				debug("match")
				break;
			}
		}
		var randomSeedNumsStr = "";
		randomSeedNumsStr += stringToCharCodes(settings.selectedUser.lastName);
		randomSeedNumsStr += stringToCharCodes(settings.selectedUser.email);
		randomSeedNumsStr += stringToCharCodes(settings.selectedUser.firstName);
		randomSeedNumsStr += stringToCharCodes(settings.selectedUser.phone);
		debug ("randomSeedNumsStr=" + randomSeedNumsStr);



		var prevDate = new Date (2017, 10, 29);
		debug ("prevDate=" + prevDate);
		prevDate.setTime(prevDate.getTime() - Number(randomSeedNumsStr.substr(0, 8)));
		debug ("prevDate(random)=" + prevDate);
		for (var i = 0; i < randomSeedNumsStr.length; i++) {
			var rand99 = Number(randomSeedNumsStr.substr(i, 2));
			debug ("rand99=" + rand99)
			var gameIx = rand99%gameNames.length;
			debug ("gameIx(normalized)=" + gameIx)
			var winPerc = rand99%10;
			if (winPerc>4){
				winPerc=0;
			}
			var game = gameNames[gameIx];
			var bets = getBet();
			var wins = getWin(bets, winPerc);
			var net = bets - wins;
			var royaltyPercentage = 0.07;
			var royaltyAmount = Math.round(net * royaltyPercentage);
			var distSharePercentage = 0.02;
			var distShareAmount = Math.round(net * distSharePercentage);
			var vendorSharePercentage = 0.05;
			var vendorShareAmount = Math.round(net * vendorSharePercentage);

			var d=prevDate;
			prevDate = new Date(d.getTime() - Number(randomSeedNumsStr.substr(0, 7)) - Number(randomSeedNumsStr.substr(i, 3)*1000000));
			var gameType = getGameType(game);
			var otherWins = "";
			var winDetails= "";
			if (winPerc>0 && gameType=="Slot"){
				if (winPerc>3){
					otherWins = (winPerc * 5) + " spins"
					winDetails="L" + winPerc + ": " + formatCurrency(wins, 2) + ", " + otherWins;
				} else {
					winDetails="L" + (13 + winPerc) + ": " + formatCurrency(wins*(1/3), 2) + ", L" + (18 + winPerc) + ": " + formatCurrency(wins*(2/3), 2);
				}
			}
			var betDetails="";
			if (gameType=="Slot"){
				betDetails = "25 lines, line bet: " + formatCurrency(bets/25, 2);
			}
			var row = {
				distributor : distributor,
				operator : operator,
				brand : brand,
				date: d,
				dateString: d.toDateString() + " " + d.toLocaleTimeString(),
				wagerId: Math.round(d.getTime()/1000000),
				game : game,
				gameId: "100" + (allGames.indexOf(game) + 10),
				gameType: gameType,
				bets : bets,
				betDetails : betDetails,
				wins : wins,
				otherWins: otherWins,
				winDetails: winDetails,
				status: "Finished",
				net : net,
				royaltyPercentage : royaltyPercentage,
				royaltyAmount : royaltyAmount,
				distSharePercentage : distSharePercentage,
				distShareAmount : distShareAmount,
				vendorSharePercentage : vendorSharePercentage,
				vendorShareAmount : vendorShareAmount,
				playerCount : 1,
				betCount : 1
			}
			//console.log(getDataRowString(row));
			dummyData.push(row);
		}
		console.log("<generateDummyData: settings=" + settings);
	}
	function debug(str) {
		console.log(str);
	}
	function mapGrouping(grouping) {
		var ret = null;
		switch (grouping) {
		case "Distributor":
			ret = "distributor";
			break;
		case "Operator":
			ret = "operator";
			break;
		case "Brand":
			ret = "brand";
			break;
		case "Game":
			ret = "game";
			break;
		case "None":
			ret = "all";
			break;
		default:
			throw ("Unhandled value for grouping: " + grouping);

		}
		return ret;
	}
	this.init = function () {
		this.settings = $gameHistorySettingsFactory;

		//if (dummyData == null) {
		generateDummyData(this.settings);
		//}
		this.groupBy = mapGrouping(this.settings.groupBy)
		debug("this.groupBy=" + this.groupBy);
		//debug("dummyData=" + dummyData);
		this.data = {};
		var selectedGames = getGamesArray(this.settings.games, true);
		var selectedBrands = getBrandsArray(this.settings.organizations, true);
		this.totals = {};
		this.totals.playerCount = 0;
		this.totals.betCount = 0;
		this.totals.bets = 0;
		this.totals.wins = 0;
		this.totals.net = 0;
		this.totals.royaltiesPerBrand = [];
		this.totals.sharesPerDistributor = [];
		this.totals.vendorShareAmount = 0;
		for (var i = 0; i < dummyData.length; i++) {
			var row = dummyData[i];
			var rowMatches = true;
			if (!exists(row.game, selectedGames)) {
				rowMatches = false;
			} 
			// else if (!this.exists(row.brand, selectedBrands)) {
			// 	rowMatches = false;
			// }
			debug("rowMatches=" + rowMatches)
			if (rowMatches) {
				var elem
				if (this.groupBy == "all") {
					elem = this.getDataGroup("all");
					//this.getDataGroup("all").rows.push(row);
				} else {
					elem = this.getDataGroup(row[this.groupBy]);
					//this.getDataGroup(row[this.groupBy]).rows.push(row);
				}
				elem.rows.push(row);
				elem.totals.playerCount += row.playerCount;
				elem.totals.betCount += row.betCount;
				elem.totals.bets += row.bets;
				elem.totals.wins += row.wins;
				elem.totals.net += row.net;
				elem.totals.vendorShareAmount += row.vendorShareAmount;
				elem.totals.royaltyAmount += row.royaltyAmount;
				elem.totals.distShareAmount += row.distShareAmount;
				//this.data.push(row);
				this.totals.playerCount += row.playerCount;
				this.totals.betCount += row.betCount;
				this.totals.bets += row.bets;
				this.totals.wins += row.wins;
				this.totals.net += row.net;
				this.totals.vendorShareAmount += row.vendorShareAmount
				accProp(row.royaltyAmount, row.operator, this.totals.royaltiesPerBrand);
				accProp(row.distShareAmount, row.distributor, this.totals.sharesPerDistributor);
			}
		}
		var periodString = "Since beginning";
		if (this.settings.startDate != null || this.settings.endDate != null) {
			if (this.settings.startDate == null) {
				periodString = "Until " + formatDate(this.settings.endDate);
			} else if (this.settings.endDate == null) {
				periodString = "Since " + formatDate(this.settings.startDate);
			} else {
				periodString = formatDate(this.settings.startDate) + " - " + formatDate(this.settings.endDate);
			}
		}

		this.periodChips = [periodString];
		this.selectedUserChips = [this.settings.selectedUser.userId];
		this.organizationsChips = getOrganizationsArray(this.settings.organizations, true);
		this.gamesChips = getGamesChipsArray(this.settings.games, true);
		this.groupChips = [this.settings.groupBy];
		//debug("this.data=" + this.data);
	}

	this.getDataGroup = function (groupId) {
		debug(">getDataGroup: groupId=" + groupId);
		if (!this.data[groupId]) {
			this.data[groupId] = {
				rows : [],
				totals : {
					playerCount : 0,
					betCount : 0,
					bets : 0,
					wins : 0,
					net : 0,
					vendorShareAmount : 0,
					royaltyAmount : 0,
					distShareAmount : 0
				}
			};
		}
		debug("<getDataGroup: this.data["+groupId+"]=" + this.data[groupId]);
		return this.data[groupId];
	}
	function accProp(amount, propId, array) {
		var found = false;
		for (var i = 0; i < array.length; i++) {
			var o = array[i];
			if (o.id == propId) {
				o.amount += amount;
				found = true;
			}
		}
		if (!found) {
			array.push({
				id : propId,
				amount : amount
			});
		}
	}
	function exists(item, list) {
		//debug (">exists: item=" + item + ", list=" + list);
		var ret = list.indexOf(item) > -1;
		//debug ("<exists: ret=" + ret);
		return ret;
	};
	function stringToCharCodes(str){
		debug(">stringToCharCodes: str=" + str);
		var ret = "";
		for (var i = 0; i<str.length; i++){
			var charCode= 
			ret += str.charCodeAt(i).toString();
		}
		debug("<stringToCharCodes: ret=" + ret);
		return ret
	}
	this.init();

	$scope.exists = exists;
	$scope.formatCurrency = formatCurrency;
	$scope.formatPercentage = formatPercentage;
}
angular.module('trimark-backoffice').controller("GameHistoryReportCtrl", ["$rootScope", "$location", "GameHistorySettingsFactory", gamehistoryReportController]);
