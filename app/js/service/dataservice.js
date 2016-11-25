var dataService = function($http)
{
	var self = this;
	self.serverUrl = "http://184.106.65.107:8003";
	//self.serverUrl = "http://localhost:8003";

	this.getAllOrganizations = function()
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/organizations/listAll"
		});
	};

	this.getChildOrganizations = function(jwtToken, organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/organizations/listChildOrganizations/" + organizationId,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.createOrganization = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/organizations/create",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.updateOrganization = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/organizations/update",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.getRolesByOwner = function(jwtToken, organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/roles/listRolesByOwner/" + organizationId,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.getRolesByOwnerAndType = function(jwtToken, organizationId, roleType)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/roles/listRolesByOwnerAndType/" + organizationId + "/" + roleType,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.getRole = function(jwtToken, roleId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/roles/findById/" + roleId,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.createRole = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/roles/create",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.updateRole = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/roles/update",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.getUsers = function(jwtToken, organizationId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/users/listAllByOrganization/" + organizationId,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.getUserByAccountId = function(jwtToken, accountId)
	{
		var self = this;
		return $http(
		{
			method: 'GET',
			url: self.serverUrl + "/users/findByAccountId/" + accountId,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.createUser = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/users/create",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.updateUser = function(jwtToken, data)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/users/update",
			data: data,
			headers: {
				"Jwt-Token": jwtToken
			}
		});
	};

	this.userChangePassword = function(jwtToken, accountId, newPassword, verifyPassword)
	{
		var self = this;
		return $http(
		{
			method: 'POST',
			url: self.serverUrl + "/users/changePassword/" + accountId,
			data: {
				newPassword: newPassword,
				verifyPassword: verifyPassword
			},
			headers: {
				"Jwt-Token": jwtToken
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

	this.myAccountChangePassword = function(jwtToken, currentPassword, newPassword, verifyPassword)
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