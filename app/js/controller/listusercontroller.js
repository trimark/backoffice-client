var listUserController = function($rootScope, $timeout, dataService)
{
	var self = this;
	self.users = [];
	self.selectedUser = null; 
	
	this.init = function(jwtToken, organization)
	{
		dataService.getUsers(jwtToken, organization.id).then(
			function(response)
			{

				if (response && response.data && response.data.code === 0)
				{
					for (var i = 0; i < response.data.data.length; i++)
					{
						var user = {
							accountId: response.data.data[i].accountId, 
							userName: response.data.data[i].organization.name + "/" + response.data.data[i].userName,
							organization: response.data.data[i].organization.name,
							role: response.data.data[i].role.name
						};
						for (var j = 0; j < response.data.data[i].accountProperties.length; j++)
						{
							user[response.data.data[i].accountProperties[j].name] = response.data.data[i].accountProperties[j].value; 
						}
						self.users.push(user);
					}					
				}
			},
			function(response, status)
			{
			}
		);
	};

	this.selectUser = function(user)
	{
		self.selectedUser = user;
		$timeout(
			function()
			{
				$rootScope.$broadcast("loadUser", self.selectedUser.accountId);
			},
		100);
	};
};

angular.module('trimark-backoffice').controller("ListUserCtrl", ["$rootScope", "$timeout", "DataService", listUserController]);