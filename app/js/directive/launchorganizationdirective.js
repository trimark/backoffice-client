var launchOrganizationDirective = function($route)
{
	return {
		controller: "OrganizationCtrl",
		controllerAs: "organizationCtrl",
		link: function(scope, element, attrs, controller)
		{
			var getOrganization = function(organization, id)
			{
				if (organization.id === id)
				{
					return organization;
				}

				if (organization.children)
				{
					for (var i = 0; i < organization.children.length; i++)
					{
						var result = getOrganization(organization.children[i], id);
						if (result)
						{
							return result;
						}
					}
				}
				return null;
			};

			scope.$on("$routeChangeSuccess", 
				function(event, next, current) 
				{
					var parentController = element.parent().controller();
					var parentOrganization = getOrganization(parentController.organization, parseInt($route.current.params.parentOrganizationId));
					if (parseInt($route.current.params.organizationId))
					{
						controller.init(parentOrganization, null);
					}
					else
					{
						controller.init(parentOrganization, getOrganization(parentOrganization, parseInt($route.current.params.organizationId)));
					}
				}
			);
		}
	};
};

angular.module('trimark-backoffice').directive("launchOrganizationDirective", ["$route", launchOrganizationDirective]);