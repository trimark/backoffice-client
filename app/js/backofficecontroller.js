var backofficeController = function($scope, $mdPanel, $mdDialog)
{
	var self = this;
	self.isUserLoggedIn = false;
	self.selectedMenu = null;
	self.loginPanel = null;

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

	this.init = function()
	{
		if (!self.isUserLoggedIn)
		{
			var position = $mdPanel.newPanelPosition().absolute().center();
			$mdPanel.open({
				attachTo: angular.element(document.body), 
				disableParentScroll: false,
				templateUrl: "partials/login.html",
				hasBackdrop: true,
				panelClass: "bo-dialog",
				position: position,
				trapFocus: true,
				clickOutsideToClose: false,
				escapeToClose: false,
				focusOnOpen: true
			}).
			then(
				function(result)
				{
					self.loginPanel = result;
				}
			);
		}
	};

	$scope.$on("loginSuccess",
		function(event, data)
		{
			self.loginPanel.close();
			self.isUserLoggedIn = true;			
			console.log("Patalinghug >>> ", data);
		}
	);

	$scope.$on("showMessage",
		function(event, message)
		{
			var position = $mdPanel.newPanelPosition().absolute().right();
			$mdPanel.open({
				attachTo: angular.element(document.body), 
				disableParentScroll: false,
				template: "<div style='padding: 24px;'>" + message + "</div>",
				hasBackdrop: false,
				panelClass: "bo-dialog",
				position: position,
				trapFocus: true,
				clickOutsideToClose: true,
				escapeToClose: true,
				focusOnOpen: true
			});
		}
	);

	self.init();
};

angular.module('trimark-backoffice').controller("BackofficeCtrl", ["$scope", '$mdPanel', '$mdDialog', backofficeController]);