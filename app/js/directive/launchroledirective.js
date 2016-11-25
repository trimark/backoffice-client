
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
					controller.init(parentController.jwtToken, parentController.organization, parentController.modules, $route.current.params.roleId);
				}
			);

			scope.$on("loadRole", 
				function(event, roleId)
				{
					var parentController = element.parent().controller();
					controller.init(parentController.jwtToken, parentController.organization, parentController.modules, roleId);
				}
			);
		}
	};
};

angular.module('trimark-backoffice').directive("launchRoleDirective", ["$route", launchRoleDirective]);