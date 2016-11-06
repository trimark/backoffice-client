
var listRoleController = function($rootScope, $timeout, dataService)
{
	var self = this;
	self.organization = null;
	self.roles = null;
	self.modules = null;
	self.selectedRole = null; 
	
	this.init = function(organization, modules)
	{
		self.organization = organization;
		self.modules = modules;
		dataService.getRolesByOwner(organization.id).then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					self.roles = response.data.data;
				}
			}
		);
	};

	this.selectRole = function(role)
	{
		self.selectedRole = role;
		$timeout(
			function()
			{
				$rootScope.$broadcast("loadRole", role.id);
			},
		100);	
	}
};

angular.module('trimark-backoffice').controller("ListRoleCtrl", ["$rootScope", "$timeout", "DataService", listRoleController]);