var launchListOrganizationDirective = function()
{
	return {
		controller: "ListOrganizationCtrl",
		controllerAs: "listOrganizationCtrl",
		link: function(scope, element, attrs, controller)
		{
			var parentController = element.parent().controller();
			controller.init(parentController.jwtToken, parentController.organization);
		}
	};
};

angular.module('trimark-backoffice').directive("launchListOrganizationDirective", launchListOrganizationDirective);