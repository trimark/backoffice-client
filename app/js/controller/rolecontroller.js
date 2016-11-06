var roleController = function($rootScope, $location, dataService)
{
	var self = this;
	self.role = null;
	self.modules = null;
	
	this.init = function(organization, modules, roleId)
	{
		self.modules = [];
		for (var i = 0; i < modules.length; i++)
		{
			var module = {id: modules[i].id};
			module.entries = [];
			for (var j = 0; j < modules[i].entries.length; j++)
			{
				var entry = {
					id: modules[i].entries[j].id,
					name: modules[i].entries[j].name,
					selectedMainPermission: null,
					mainPermissions: modules[i].entries[j].mainPermissions,
					additionalPermissions: []  
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
			dataService.getRole(roleId).then(
				function(response)
				{
					console.log("SGT PATALINGHUG >>> ", role);
				}
			);
		}
	};
	
	this.save = function()
	{
		if (self.role.id === 0)
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
			dataService.createRole(self.role).then(
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
	};
}

angular.module('trimark-backoffice').controller("RoleCtrl", ["$rootScope", "$location", "DataService", roleController]);