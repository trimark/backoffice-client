var launchListRoleDirective = function()
{
	return {
		controller: "ListRoleCtrl",
		controllerAs: "listRoleCtrl",
		link: function(scope, element, attrs, controller)
		{
			var parentController = element.parent().controller();
			controller.init(parentController.jwtToken, parentController.organization, parentController.modules);
		}
	};
};

angular.module('trimark-backoffice').directive("launchListRoleDirective", launchListRoleDirective);