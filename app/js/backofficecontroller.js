var backofficeController = function($scope, $mdPanel)
{
	var self = this;
	self.selectedMenu = null;

	$scope.menus = [
		{
			id: "reports", name: "Reports", opened: false,
			subMenus: [
				{id: "gameresults", name: "Game Results", url: "/", selected: false},
				{id: "royalties", name: "Royalties", url: "/", selected: false},
				{id: "gamehistory", name: "Game History", url: "/", selected: false}
			]
		},
		{
			id: "games", name: "Games", opened: false,
			subMenus: [
				{id: "gamedefinitions", name: "Game Definitions", url: "/", selected: false},
				{id: "mygames", name: "My Games", url: "/", selected: false}
			]
		},
		{
			id: "administration", name: "administration", opened: false,
			subMenus: [
				{id: "myaccount", name: "My Account", url: "#/myaccount", selected: false},
				{id: "organizations", name: "Organizations", url: "#/organizations", selected: false},
				{id: "roles", name: "Roles", url: "#/roles", selected: false},
				{id: "users", name: "Users", url: "/", selected: false}
			]
		}
	];

	this.toggleMenu = function(menu)
	{
		if (self.selectedMenu)
		{
			self.selectedMenu.opened = false;
		}
		self.selectedMenu = (self.selectedMenu !== menu) ? menu : null;
		menu.opened = self.selectedMenu !== null;
	};

	this.changePassword = function()
	{
		var position = $mdPanel.newPanelPosition().absolute().center();
		$mdPanel.open({
			attachTo: angular.element(document.body), 
			disableParentScroll: false,
			templateUrl: "partials/change-password.html",
			hasBackdrop: true,
			panelClass: "bo-dialog",
			position: position,
			trapFocus: true,
			zIndex: 150,
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: true
		});
	};
};

angular.module('trimark-backoffice').controller("BackofficeCtrl", ["$scope", '$mdPanel', backofficeController]);