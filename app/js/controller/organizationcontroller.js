var organizationController = function($rootScope, $scope, $location, dataService)
{
	var self = this;
	self.organization = null;
	self.roles = null;

	this.init = function(parentOrganization, organization)
	{
		console.log("organizationController >>> ", parentOrganization);
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
		dataService.getRolesByOwnerAndType(parentOrganization.id, "Organization").then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					self.roles = response.data.data;
				}
			}
		);
	};

	this.save = function()
	{
		if (self.organization.id === 0)
		{
			dataService.createOrganization(self.organization).then(
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
			dataService.updateOrganization(self.organization).then(
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