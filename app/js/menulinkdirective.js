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
		}
	};
};

angular.module('trimark-backoffice').directive("menuLinkDirective", menuLinkDirective);