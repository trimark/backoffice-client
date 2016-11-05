var roleController = function($rootScope, $location, dataService)
{
	var self = this;
	self.role = null;
	
	this.init = function(organization, roleId)
	{
		if (parseInt(roleId) === 0)
		{
			self.role = {
				id: 0,
				name: "",
				description: "",
				type: "",
				organization: organization
			};
		}
		else
		{

		}
	};
	
	this.save = function()
	{
		if (self.role.id === 0)
		{
			dataService.createRole(self.role).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "Role " + self.role.name + " created");
						$location.path("/roles");
					}
				}
			);
		}
	};

	self.init();
}

angular.module('trimark-backoffice').controller("RoleCtrl", ["$rootScope", "$location", "DataService", roleController]);