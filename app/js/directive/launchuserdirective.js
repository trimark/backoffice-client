var launchUserDirective = function($route)
{
	return {
		controller: "UserCtrl",
		controllerAs: "userCtrl",
		link: function(scope, element, attrs, controller)
		{
			scope.$on("$routeChangeSuccess", 
				function(event, next, current) 
				{
					var parentController = element.parent().controller();
					controller.init(parentController.organization, $route.current.params.accountId);
				}
			);

			scope.$on("loadUser", 
				function(event, accountId)
				{
					var parentController = element.parent().controller();
					controller.init(parentController.organization, accountId);
				}
			);
		}
	};
};

angular.module('trimark-backoffice').directive("launchUserDirective", ["$route", launchUserDirective]);