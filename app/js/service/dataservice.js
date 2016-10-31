var dataService = function($http)
{
	this.getAllOrganizations = function()
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/organization/getAllOrganizations"
		});
	};

	this.login = function(organization, userName, password)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: "http://localhost:8003/login",
			data: {
				userName: userName,
				password: password,
				organization: organization
			}
		});
	};
}

angular.module('trimark-backoffice').service("DataService", ["$http", dataService]);