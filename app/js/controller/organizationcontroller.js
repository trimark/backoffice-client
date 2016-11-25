var organizationController = function($rootScope, $scope, $location, dataService)
{
	var self = this;
	self.organization = null;
	self.roles = null;
	self.jwtToken = null;

	this.init = function(jwtToken, parentOrganization, organization)
	{
		self.jwtToken = jwtToken;
		if (organization)
		{
			self.organization = {
				id: organization.id,
				name: organization.name,
				parent: {
					id: parentOrganization.id,
					name: parentOrganization.name
				},
				role: organization.role
			};
		}
		else
		{
			self.organization = {
				id: 0,
				name: "",
				parent: {
					id: parentOrganization.id,
					name: parentOrganization.name
				},
				role: null
			};
		}
		dataService.getRolesByOwnerAndType(jwtToken, parentOrganization.id, "Organization").then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					self.roles = response.data.data;
				}
			},
			function(response)
			{
				console.log(response);
			}
		);
	};

	this.save = function()
	{
		if (self.organization.id === 0)
		{
			dataService.createOrganization(self.jwtToken, self.organization).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "Organization " + self.organization.name + " created");
						$location.path("/organizations");
					}
				}
			);
		}
		else
		{
			dataService.updateOrganization(self.jwtToken, self.organization).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "Organization " + self.organization.name + " updated");
						$location.path("/organizations");
					}
				}
			);
		}
	};
}

angular.module('trimark-backoffice').controller("OrganizationCtrl", ["$rootScope", "$scope", "$location", "DataService", organizationController]);