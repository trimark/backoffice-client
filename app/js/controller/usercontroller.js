var userController = function($rootScope, $location, $filter, $mdPanel, dataService)
{
	var self = this;
	self.jwtToken = null;
	self.organizations = null;
	self.roles = null;

	self.accountId = 0;
	self.userName = null;
	self.password = null;
	self.organization = null;
	self.role = null;
	self.firstName = null;
	self.lastName = null;
	self.email = null;
	self.phone = null;
	self.mobile = null;

	this.init = function(jwtToken, organization, accountId)
	{
		self.jwtToken = jwtToken;
		var organizations = [];
		organizations.push({
			id: organization.id,
			name: organization.name,
			displayOrder: 1
		});
		self.addChildOrganizations(organizations, organization.children, 1);
		self.organizations = $filter('orderBy')(organizations, 'displayOrder', false);
		self.accountId = parseInt(accountId);
		if (self.accountId)
		{
			dataService.getUserByAccountId(self.jwtToken, self.accountId).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						self.userName = response.data.data.userName;
						self.role = response.data.data.role;
						self.organization = response.data.data.organization;
						for (var i = 0; i < response.data.data.accountProperties.length; i++)
						{
							self[response.data.data.accountProperties[i].name] = {
								id: response.data.data.accountProperties[i].id,
								value: response.data.data.accountProperties[i].value
							}
						}
						self.loadRoles();
					}
				}
			);
		}
		else
		{
			self.firstName = {id: 0, value: ""};
			self.lastName = {id: 0, value: ""};
			self.email = {id: 0, value: ""};
			self.phone = {id: 0, value: ""};
			self.mobile = {id: 0, value: ""};
		}
	};

	this.addChildOrganizations = function(organizations, children, displayOrder)
	{
		if (children)
		{
			displayOrder++;
			for (var i = 0; i < children.length; i++)
			{
				organizations.push({
					id: children[i].id,
					name: children[i].name,
					displayOrder: displayOrder
				});
				self.addChildOrganizations(organizations, children[i].children, displayOrder);
			}
		}
	};

	this.loadRoles = function()
	{
		if (self.organization)
		{
			dataService.getRolesByOwnerAndType(self.jwtToken, self.organization.id, "User").then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						self.roles = response.data.data;
					}
				}
			);
		}
	};

	this.save = function()
	{
		var user = {
			accountId: self.accountId,
			userName: self.userName,
			password: self.password,
			organization: self.organization,
			role: self.role,
			accountProperties: []
		};

		if (self.firstName.value.length > 0)
		{
			user.accountProperties.push({
				id: self.firstName.id,
				name: "firstName",
				value: self.firstName.value
			});
		}

		if (self.lastName.value.length > 0)
		{
			user.accountProperties.push({
				id: self.lastName.id,
				name: "lastName",
				value: self.lastName.value
			});
		}

		if (self.email.value.length > 0)
		{
			user.accountProperties.push({
				id: self.email.id,
				name: "email",
				value: self.email.value
			});
		}

		if (self.phone.value.length > 0)
		{
			user.accountProperties.push({
				id: self.phone.id,
				name: "phone",
				value: self.phone.value
			});
		}

		if (self.mobile.value.length > 0)
		{
			user.accountProperties.push({
				id: self.mobile.id,
				name: "mobile",
				value: self.mobile.value
			});
		}

		if (self.accountId === 0)
		{
			dataService.createUser(self.jwtToken, user).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "User " + self.userName + " created");
						$location.path("/users");
					}
				}
			);
		}
		else
		{
			dataService.updateUser(self.jwtToken, user).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "User " + self.userName + " updated");
						$location.path("/users");
					}
				}
			);
		}
	};

	this.changePassword = function()
	{
		var position = $mdPanel.newPanelPosition().absolute().center();
		var jwtToken = self.jwtToken;
		var accountId = self.accountId;
		$mdPanel.open({
			controller: function(mdPanelRef)
			{
				this.newPassword = null;
				this.verifyPassword = null;

				this.save = function()
				{
					var self = this;
					dataService.userChangePassword(jwtToken, accountId, this.newPassword, this.verifyPassword).then(
						function(response)
						{
							if (response && response.data && response.data.code === 0)
							{
								$rootScope.$broadcast("showMessage", {
									type: "success",
									message: response.data.data
								});
								self.close();
							}
							else
							{
								$rootScope.$broadcast("showMessage", {
									type: "error",
									message: response.data.data
								});
								self.close();
							}
						},
						function(response)
						{
							$rootScope.$broadcast("showMessage", {
								type: "error",
								message: "Password Change Failed!!!"
							});
							self.close();
						}
					);
				};

				this.close = function()
				{
					mdPanelRef && mdPanelRef.close().then(
						function() 
						{
							mdPanelRef.destroy();
						}
					);
				};
			},
			controllerAs: "changePasswordCtrl",
			attachTo: angular.element(document.body), 
			disableParentScroll: false,
			templateUrl: "partials/user-change-password.html",
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

angular.module('trimark-backoffice').controller("UserCtrl", ["$rootScope", "$location", "$filter", "$mdPanel", "DataService", userController]);