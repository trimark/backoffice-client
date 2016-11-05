var launchRoleDirective = function($route)
{
	return {
		controller: "RoleCtrl",
		controllerAs: "roleCtrl",
		link: function(scope, element, attrs, controller)
		{
			scope.$on("$routeChangeSuccess", 
				function(event, next, current) 
				{
					var parentController = element.parent().controller();
					controller.init(parentController.organization, $route.current.params.roleId);
				}
			);
		}
	};
};

angular.module('trimark-backoffice').directive("launchRoleDirective", ["$route", launchRoleDirective]);