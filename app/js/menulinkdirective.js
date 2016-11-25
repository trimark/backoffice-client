var menuLinkDirective = function()
{
	return {
		scope: {
			data: "="
		},
		templateUrl: 'partials/menu-link.html',
		link: function(scope, element)
		{
			var controller = element.parent().controller();

			scope.onSelectMenu = function()
			{
				controller.selectSubMenu(scope.data);
			};
		}
	};
};

angular.module('trimark-backoffice').directive("menuLinkDirective", menuLinkDirective);