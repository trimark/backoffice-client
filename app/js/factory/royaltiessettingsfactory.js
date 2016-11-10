var royaltiesSettingsFactory = function () {
	var ret = {
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
						label : 'Genie큦 Gold'
					}, {
						label : 'Haunted Mansion'
					}, {
						label : 'Hillbilly Haven'
					}, {
						label : 'Jester큦 Gold'
					}, {
						label : 'Knights of Atlantis'
					}, {
						label : 'Mermaids and Pearls'
					}, {
						label : 'Nefertiti큦 Fortune'
					}, {
						label : 'Pirate큦 Treasure Trove'
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
				label : 'Distributor',
				children : [{
						label : 'Operator A',
						children : [{
								label : 'Brand A1'
							}, {
								label : 'Brand A2'
							}, {
								label : 'Brand A3'
							}
						]
					}, {
						label : 'Operator B',
						children : [{
								label : 'Brand B1'
							}, {
								label : 'Brand B2'
							}, {
								label : 'Brand B3'
							}
						]
					}, {
						label : 'Operator C',
						children : [{
								label : 'Brand C1'
							}, {
								label : 'Brand C2'
							}, {
								label : 'Brand C3'
							}
						]
					}
				]
			}
		],
		columns : ["Distributor", "Operator", "Brand", "Player Count", "Bet Count", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"],
		selectedColumns : ["Distributor", "Operator", "Brand", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"],
		summaryData : ["Distributor", "Operator", "Brand", "Player Count", "Bet Count", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"],
		selectedSummaryData : ["Distributor", "Operator", "Brand", "Bets", "Wins", "Net Gaming", "Royalty", "Distributor share", "Supplier share", "Operator Share"],
		showSummary: true
	}
	return ret;
}

angular.module('trimark-backoffice').factory("RoyaltiesSettingsFactory", [royaltiesSettingsFactory]);
