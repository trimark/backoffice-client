var loginController = function($rootScope, dataService)
{
	var self = this;
	self.userName = "";
	self.password = "";
	self.organization = null;
	self.organizations = null;

	this.init = function()
	{
		dataService.getAllOrganizations().then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					self.organizations = response.data.response;
				}
			}
		);
	};
	
	this.onLogin = function()
	{
		dataService.login(self.organization, self.userName, self.password).then(
			function(response)
			{
				if (response && response.data && response.data.code === 0)
				{
					$rootScope.$broadcast("loginSuccess", response.data.response);
				}
			}
		);
		//$rootScope.$broadcast("showMessage", "Andrea Batang Ina");
	};

	self.init();
}

angular.module('trimark-backoffice').controller("LoginCtrl", ["$rootScope", "DataService", loginController]);