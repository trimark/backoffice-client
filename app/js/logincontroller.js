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
					self.organizations = response.data.data;
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
					$rootScope.$broadcast("loginSuccess", response.data.data);
				}
				else
				{
					$rootScope.$broadcast("showMessage", {
						type: "error",
						message: response.data.data
					});
				}
			},
			function(response)
			{
				$rootScope.$broadcast("showMessage", {
					type: "error",
					message: response.data.data
				});
			}
		);
	};

	self.init();
}

angular.module('trimark-backoffice').controller("LoginCtrl", ["$rootScope", "DataService", loginController]);