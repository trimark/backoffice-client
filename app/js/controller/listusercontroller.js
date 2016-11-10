var listUserController = function(dataService)
{
	var self = this;
	self.organizations = null; 
	
	this.init = function(organization)
	{
		/*
		dataService.getChildOrganizations(organization.id).then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					self.organizations = response.data.data;
				}
			},
			function(response, status)
			{
			}
		);
		*/
	};
};

angular.module('trimark-backoffice').controller("ListUserCtrl", ["DataService", listUserController]);