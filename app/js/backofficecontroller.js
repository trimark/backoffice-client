var backofficeController = function($rootScope, $scope, $route, $location, $mdPanel, $mdDialog)
{
	var self = this;
	self.modules = [];
	self.organization = null;
	self.modulePermissions = null;
	self.isUserLoggedIn = false;
	self.selectedMenu = null;
	self.loginPanel = null;

	this.initModules = function()
	{
		self.modules.push({
			id: "reports", name: "Reports", opened: false,
			entries: [
				{
					id: "GAMERESULTS",
					name: "Game Results",
					menu: {
						name: "Game Results", 
						url: "/", 
						selected: false
					}
				},
				{
					id: "ROYALTIES",
					name: "Royalties",
					menu: {
						name: "Royalties", 
						url: "#/royalties-settings", 
						selected: false
					}
				},
				{
					id: "GAMEHISTORY",
					name: "Game History",
					menu: {
						name: "Game History", 
						url: "/", 
						selected: false
					}
				}
			]
		});
		self.modules.push({
			id: "games", name: "Games", opened: false,
			entries: [
				{
					id: "GAMEDEFINITIONS",
					name: "Game Definitions",
					mainPermissions: [{
							id: "READ",
							name: "Read"
						},
						{
							id: "UPDATE",
							name: "Update"
						},
						{
							id: "CREATE",
							name: "Create"
						},
						{
							id: "DELETE",
							name: "Delete"
						},
						{
							id: "FULL",
							name: "Full"
						}
					],
					additionalPermissions: [{
							id: "ACTIVATEINACTIVATE",
							name: "Activate/Inactivate"
						},
						{
							id: "SETPERMISSIONS",
							name: "Set Permissions"
						}
					],
					menu: {
						name: "Game Definitions", 
						url: "/", 
						selected: false
					}
				},
				{
					id: "MYGAMES",
					name: "Game Configurations",
					mainPermissions: [{
							id: "READ",
							name: "Read"
						},
						{
							id: "UPDATE",
							name: "Update"
						},
						{
							id: "CREATE",
							name: "Create"
						},
						{
							id: "DELETE",
							name: "Delete"
						},
						{
							id: "FULL",
							name: "Full"
						}
					],
					additionalPermissions: [{
							id: "ACTIVATEINACTIVATE",
							name: "Activate/Inactivate"
						},
						{
							id: "SETPERMISSIONS",
							name: "Set Permissions"
						}
					],
					menu: {
						name: "My Games", 
						url: "/", 
						selected: false
					} 
				}
			]
		});
		self.modules.push({
			id: "administration", name: "administration", opened: false,
			entries: [
				{
					id: "MYACCOUNT",
					name: "My Account",
					menu: {
						name: "My Account", 
						url: "#/myaccount", 
						selected: false,
						authenticate: true
					}
				},
				{
					id: "ORGANIZATIONS",
					name: "Organizations",
					mainPermissions: [{
							id: "READ",
							name: "Read"
						},
						{
							id: "UPDATE",
							name: "Update"
						},
						{
							id: "CREATE",
							name: "Create"
						},
						{
							id: "DELETE",
							name: "Delete"
						},
						{
							id: "FULL",
							name: "Full"
						}
					],
					additionalPermissions: [{
							id: "ACTIVATEINACTIVATE",
							name: "Activate/Inactivate"
						},
						{
							id: "EDITROLES",
							name: "Edit Roles"
						}
					],
					menu: {
						name: "Organizations", 
						url: "#/organizations", 
						selected: false						
					},
					entries: [{
						regexp: /^\/organizations$/,
						allowedPermissions: ["READ", "UPDATE", "CREATE", "DELETE", "FULL", "ACTIVATEINACTIVATE", "EDITROLES"]
					},
					{
						regexp: /^\/organization\/update\/(?:([^\/]+))$/,
						allowedPermissions: ["UPDATE", "CREATE", "DELETE", "FULL", "ACTIVATEINACTIVATE", "EDITROLES"]
					},
					{
						regexp: /^\/organization\/create\/(?:([^\/]+))$/,
						allowedPermissions: ["CREATE", "DELETE", "FULL"]
					}]
				},
				{
					id: "ROLES", 
					name: "Roles",
					mainPermissions: [{
							id: "READ",
							name: "Read"
						},
						{
							id: "UPDATE",
							name: "Update"
						},
						{
							id: "CREATE",
							name: "Create"
						},
						{
							id: "DELETE",
							name: "Delete"
						},
						{
							id: "FULL",
							name: "Full"
						}
					],
					menu: {
						name: "Roles", 
						url: "#/roles", 
						selected: false
					}
				},
				{
					id: "USERS",
					name: "Users",
					mainPermissions: [{
							id: "READ",
							name: "Read"
						},
						{
							id: "UPDATE",
							name: "Update"
						},
						{
							id: "CREATE",
							name: "Create"
						},
						{
							id: "DELETE",
							name: "Delete"
						},
						{
							id: "FULL",
							name: "Full"
						}
					],
					additionalPermissions: [{
							id: "ACTIVATEINACTIVATE",
							name: "Activate/Inactivate"
						},
						{
							id: "EDITROLES",
							name: "Edit Roles"
						},
						{
							id: "EDITPROFILE",
							name: "Edit Profile"
						},
						{
							id: "CHANGEPASSWORD",
							name: "Change Password"
						}
					],
					menu: {
						name: "Users", 
						url: "#/users", 
						selected: false
					}
				}
			]
		});
	};

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
		else
		{
			self.initModules();
		}
	};

	$scope.$on("loginSuccess",
		function(event, data)
		{
			self.loginPanel.close();
			self.isUserLoggedIn = true;
			self.organization = data.organization;
			self.modulePermissions = data.role.modulePermissions;
			self.initModules();		
			self.isUserLoggedIn = true;
			if (!self.isAuthorized($location.path()))
			{
				$location.path("/");
				$rootScope.$broadcast("showMessage", "You are not authorized!!!");
			}			
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

	this.isAuthorized = function(path)
	{
		for (var i = 0; i < self.modules.length; i++)
		{
			var entries = self.modules[i].entries;
			for (var j = 0; j < entries.length; j++)
			{
				var modulePermission, k;
				if (self.modulePermissions)
				{
					for (k = 0; k < self.modulePermissions.length; k++)
					{
						if (entries[j].id === self.modulePermissions[k].module)
						{
							modulePermission = self.modulePermissions[k]; 
						}
					}
				}
				if (entries[j].entries)
				{
					for (var k = 0; k < entries[j].entries.length; k++)
					{
						if (entries[j].entries[k].regexp.test(path))
						{
							if (self.hasPermission(modulePermission, entries[j].entries[k].allowedPermissions))
							{
								if (entries[j].entries[k].authenticate && !self.isUserLoggedIn)
								{
									return false;
								}
								return true;
							}
							else
							{
								return false;
							}
						}
					}
				}
			}
		}
		return true;
	};

	this.hasPermission = function(modulePermission, allowedPermissions)
	{
		if (allowedPermissions)
		{
			if (modulePermission)
			{
				for (var i = 0; i < allowedPermissions.length; i++)
				{
					if (modulePermission.permissions.indexOf(allowedPermissions[i]) >= 0)
					{
						return true;
					}
				}
				return false;
			}
			else
			{
				return false;
			}
		}
		return true;
	};

	$rootScope.$on("$routeChangeStart",
		function (event, next, current)
		{
			console.log("Patalinghug >>> ", $route);
			if (!self.isAuthorized($location.path()))
			{
				$rootScope.$broadcast("showMessage", "You are not authorized!!!");
				event.preventDefault();
			}
		}
	);

	self.init();
};

angular.module('trimark-backoffice').controller("BackofficeCtrl", ["$rootScope", "$scope", "$route", "$location", "$mdPanel", 
	"$mdDialog", backofficeController]);