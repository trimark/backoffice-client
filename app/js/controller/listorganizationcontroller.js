
var listOrganizationController = function(dataService)
{
	var self = this;
	self.rootOrganization = null;
	self.parentOrganization = null;
	self.selectedOrganization = null;
	self.organizations = null; 
	
	this.init = function(organization)
	{
		self.rootOrganization = organization;
		self.selectedOrganization = organization;
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
	};

	this.onSelectOrganization = function(organization)
	{
		if (self.selectedOrganization === organization)
		{
			self.selectedOrganization = self.rootOrganization;
		}
		else
		{
			self.selectedOrganization = organization;
		}
	};
};

angular.module('trimark-backoffice').controller("ListOrganizationCtrl", ["DataService", listOrganizationController]);