var dataService = function($http)
{
	var self = this;
	self.jwtToken = null;
	self.serverUrl = "http://184.106.65.107:8003";
	//self.serverUrl = "http://localhost:8003";

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
			url: self.serverUrl + "/organizations/listAll"
		});
	};

	this.getChildOrganizations = function(organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/organizations/listChildOrganizations/" + organizationId,
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
			url: self.serverUrl + "/organizations/findById/" + organizationId,
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
			url: self.serverUrl + "/organizations/create",
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
			url: self.serverUrl + "/organizations/update",
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
			url: self.serverUrl + "/roles/listRolesByOwner/" + organizationId,
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
			url: self.serverUrl + "/roles/listRolesByOwnerAndType/" + organizationId + "/" + roleType,
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
			url: self.serverUrl + "/roles/findById/" + roleId,
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
			url: self.serverUrl + "/roles/create",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.updateRole = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/roles/update",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getUsers = function(organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/users/listAllByOrganization/" + organizationId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.getUserByAccountId = function(accountId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/users/findByAccountId/" + accountId,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.createUser = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/users/create",
			data: data,
			headers: {
				"Jwt-Token": self.jwtToken
			}
		});
	};

	this.updateUser = function(data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/users/update",
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
			url: self.serverUrl + "/login",
			data: {
				userName: userName,
				password: password,
				organization: organization
			}
		});
	};

	this.changePassword = function(jwtToken, currentPassword, newPassword, verifyPassword)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/changePassword",
			data: {
				currentPassword: currentPassword,
				newPassword: newPassword,
				verifyPassword: verifyPassword
			},
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};
}

angular.module('trimark-backoffice').service("DataService", ["$http", dataService]);