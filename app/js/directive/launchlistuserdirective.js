var launchListUserDirective = function()
{
	return {
		controller: "ListUserCtrl",
		controllerAs: "listuserCtrl",
		link: function(scope, element, attrs, controller)
		{
			var parentController = element.parent().controller();
			controller.init(parentController.organization);
		}
	};
};

angular.module('trimark-backoffice').directive("launchListUserDirective", launchListUserDirective);