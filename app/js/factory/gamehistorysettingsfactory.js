var gameHistorySettingsFactory = function () {
	console.log("gameHistorySettingsFactory");
	var ret = {
		organization: "",
		selectedUser: null,
		startDate: null,
		endDate: null,
		games : [{
				selected : true,
				label : 'Lottery',
				children : [{
						label : 'EuroMillions'
					}, {
						label : 'Powerball'
					}
				]
			}, {
				selected : true,
				label : 'ScratchCards',
				children : [{
						label : 'The Amazing Circus'
					}, {
						label : 'Astro'
					}, {
						label : 'Beauty Salon'
					}, {
						label : 'Geisha Memoirs'
					}, {
						label : 'Genie\'s Gold'
					}, {
						label : 'Haunted Mansion'
					}, {
						label : 'Hillbilly Haven'
					}, {
						label : 'Jester\'s Gold'
					}, {
						label : 'Knights of Atlantis'
					}, {
						label : 'Mermaids and Pearls'
					}, {
						label : 'Nefertiti\'s Fortune'
					}, {
						label : 'Pirate\'s Treasure Trove'
					}, {
						label : 'Rockstar Riches'
					}, {
						label : 'Shopping Spree'
					}, {
						label : 'Sky Kingdom'
					}, {
						label : 'Tiki Treasure'
					}, {
						label : 'Sassy Sevens'
					}, {
						label : 'Wicked Witch'
					}
				]
			}, {
				selected : true,
				label : 'Slots',
				children : [{
						label : 'Dwarves & Dragons'
					}, {
						label : 'Funhouse'
					}
				]
			}
		],
		organizations : [{
				selected : true,
				label : 'Distributor A' ,
				children : [{
						label : 'Operator AA',
						children : [{
								label : 'Brand AA1'
							}, {
								label : 'Brand AA2'
							}, {
								label : 'Brand AA3'
							}
						]
					}, {
						label : 'Operator AB',
						children : [{
								label : 'Brand AB1'
							}, {
								label : 'Brand AB2'
							}, {
								label : 'Brand AB3'
							}
						]
					}, {
						label : 'Operator AC',
						children : [{
								label : 'Brand AC1'
							}, {
								label : 'Brand AC2'
							}, {
								label : 'Brand AC3'
							}
						]
					}
				]
			},
			{
				selected : true,
				label : 'Distributor B',
				children : [{
						label : 'Operator BA',
						children : [{
								label : 'Brand BA1'
							}, {
								label : 'Brand BA2'
							}, {
								label : 'Brand BA3'
							}
						]
					}, {
						label : 'Operator BB',
						children : [{
								label : 'Brand BB1'
							}, {
								label : 'Brand BB2'
							}
						]
					}
				]
			}
		],
		columns : ["Date", "Game", "Game Type", "Game ID", "Wager ID", "Bet", "Bet Details", "Cash Wins", "Other Wins", "Win Details", "Status"],
		selectedColumns : ["Date", "Game", "Game Type", "Game ID", "Wager ID", "Bet", "Bet Details", "Cash Wins", "Other Wins", "Win Details", "Status"],
		totalsData : ["Player Details", "Bet Count", "Bets", "Wins", "Net Gaming"],
		selectedTotalsData : ["Player Details", "Bet Count", "Bets", "Wins", "Net Gaming"],
		showTotals: true,
		groupBy: "None"
	}
	return ret;
}

angular.module('trimark-backoffice').factory("GameHistorySettingsFactory", [gameHistorySettingsFactory]);
