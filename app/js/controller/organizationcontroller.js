var organizationController = function($rootScope, $scope, $route, $location, dataService)
{
	var self = this;
	self.parentOrganization = null;
	self.organization = null;
	self.roles = null;

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

	$scope.$on("$routeChangeSuccess", 
		function(event, next, current) 
		{
			dataService.getOrganization($route.current.params.parentOrganizationId).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						self.parentOrganization = response.data.data;
						if (parseInt($route.current.params.organizationId) === 0)
						{
							self.organization = {
								id: 0,
								name: "",
								parent: self.parentOrganization,
								role: null					
							};
						}
						else
						{
							dataService.getOrganization($route.current.params.organizationId).then(
								function(response)
								{
									if (response && response.data && response.data.code === 0)
									{
										self.organization = response.data.data;
										self.organization.parentOrganization = self.parentOrganization;
									}
								}
							);
						}
					}
				}
			);

			dataService.getRolesByOwnerAndType($route.current.params.parentOrganizationId, "Organization").then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						self.roles = response.data.data;
					}
				}
			);
		}
	);
}

angular.module('trimark-backoffice').controller("OrganizationCtrl", ["$rootScope", "$scope", "$route", "$location", "DataService", organizationController]);