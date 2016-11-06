var dataService = function($http)
{
	var self = this;
	self.jwtToken = null;

	this.setJwtToken = function(jwtToken)
	{
		self.jwtToken = jwtToken;
	};

	this.getAllOrganizations = function()
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/organizations/listAll"
		});
	};

	this.getChildOrganizations = function(organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/organizations/listChildOrganizations/" + organizationId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getOrganization = function(organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/organizations/findById/" + organizationId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.createOrganization = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: "http://localhost:8003/organizations/create",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.updateOrganization = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: "http://localhost:8003/organizations/update",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getRolesByOwner = function(organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/roles/listRolesByOwner/" + organizationId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getRolesByOwnerAndType = function(organizationId, roleType)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/roles/listRolesByOwnerAndType/" + organizationId + "/" + roleType,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getRole = function(roleId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: "http://localhost:8003/roles/findById/" + roleId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.createRole = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: "http://localhost:8003/roles/create",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
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