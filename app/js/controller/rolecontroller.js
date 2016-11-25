var roleController = function($rootScope, $location, dataService)
{
	var self = this;
	self.role = null;
	self.modules = null;
	self.jwtToken = null;
	
	this.init = function(jwtToken, organization, modules, roleId)
	{
		self.jwtToken = jwtToken;
		self.modules = [];
		var i, j;
		for (i = 0; i < modules.length; i++)
		{
			var module = {id: modules[i].id};
			module.entries = [];
			for (j = 0; j < modules[i].entries.length; j++)
			{
				var entry = {
					id: modules[i].entries[j].id,
					name: modules[i].entries[j].name,
					selectedMainPermission: null,
					selectedAdditionalPermissions: [],
					mainPermissions: modules[i].entries[j].mainPermissions,
					additionalPermissions: [],
					hasSomePermission: false  
				};
				if (modules[i].entries[j].additionalPermissions)
				{
					for (var k = 0; k < modules[i].entries[j].additionalPermissions.length; k++)
					{
						entry.additionalPermissions.push({
							id: modules[i].entries[j].additionalPermissions[k].id,
							name: modules[i].entries[j].additionalPermissions[k].name,
							allowed: false
						});
					}
				}
				module.entries.push(entry);
			}
			self.modules.push(module);
		}
		if (parseInt(roleId) === 0)
		{
			self.role = {
				id: 0,
				name: "",
				description: "",
				type: "",
				organization: organization
			};
		}
		else
		{
			dataService.getRole(self.jwtToken, roleId).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						self.role = {
							id: response.data.data.id,
							name: response.data.data.name,
							description: response.data.data.description,
							type: response.data.data.type,
							organization: organization
						}
					}
					for (i = 0; i < self.modules.length; i++)
					{
						for (j = 0; j < self.modules[i].entries.length; j++)
						{
							self.setModuleEntryPermission(self.modules[i].entries[j], response.data.data.modulePermissions);
						}
					}
				}
			);
		}
	};

	this.setModuleEntryPermission = function(moduleEntry, modulePermissions)
	{
		for (var i = 0; i < modulePermissions.length; i++)
		{
			var modulePermission = modulePermissions[i];
			if (moduleEntry.id === modulePermission.module)
			{
				var hasSomePermission = false;
				var j, k;
				for (j = 0; j < moduleEntry.mainPermissions.length; j++)
				{
					for (k = 0; k < modulePermission.permissions.length; k++)
					{
						if (moduleEntry.mainPermissions[j].id === modulePermission.permissions[k])
						{
							moduleEntry.selectedMainPermission = moduleEntry.mainPermissions[j]; 
							hasSomePermission = true;
							break;
						}
					}
					if (hasSomePermission)
					{
						break;
					}
				}
				for (j = 0; j < moduleEntry.additionalPermissions.length; j++)
				{
					for (k = 0; k < modulePermission.permissions.length; k++)
					{
						if (moduleEntry.additionalPermissions[j].id === modulePermission.permissions[k])
						{
							moduleEntry.additionalPermissions[j].allowed = true;
							moduleEntry.selectedAdditionalPermissions.push(moduleEntry.additionalPermissions[j]); 
							hasSomePermission = true;
						}
					}
				}
				moduleEntry.hasSomePermission = hasSomePermission;
				break;
			}
		}
	};
	
	this.save = function()
	{
		self.role.aclEntries = [];
		for (var i = 0; i < self.modules.length; i++)
		{
			for (var j = 0; j < self.modules[i].entries.length; j++)
			{
				var permissions = [];
				if (self.modules[i].entries[j].selectedMainPermission)
				{
					permissions.push(self.modules[i].entries[j].selectedMainPermission.id);
				}
				if (self.modules[i].entries[j].additionalPermissions)
				{
					for (var k = 0; k < self.modules[i].entries[j].additionalPermissions.length; k++)
					{
						if (self.modules[i].entries[j].additionalPermissions[k].allowed)
						{
							permissions.push(self.modules[i].entries[j].additionalPermissions[k].id);
						}
					}
				}
				if (permissions.length)
				{
					self.role.aclEntries.push({
						module: self.modules[i].entries[j].id,
						permissions: permissions
					});
				}
			}
		}
		if (self.role.id === 0)
		{
			dataService.createRole(self.jwtToken, self.role).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "Role " + self.role.name + " created");
						$location.path("/roles");
					}
				}
			);
		}
		else
		{
			dataService.updateRole(self.jwtToken, self.role).then(
				function(response)
				{
					if (response && response.data && response.data.code === 0)
					{
						$rootScope.$broadcast("showMessage", "Role " + self.role.name + " updated");
						$location.path("/roles");
					}
				}
			);
		}
	};
}

angular.module('trimark-backoffice').controller("RoleCtrl", ["$rootScope", "$location", "DataService", roleController]);