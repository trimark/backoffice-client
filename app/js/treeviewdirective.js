var treeviewDirective = function($timeout, $mdUtil)
{
	return {
		restrict: 'E',
		link: function(scope, element)
		{
			scope.onToggleMenu = function($event)
			{
				var el = angular.element($event.currentTarget),
					li = el.parent();
					li.toggleClass('collapsed'),
					iconName = el.find('md-icon').text();

				el.find('md-icon').text(iconName === 'add_box' ? 'indeterminate_check_box' : 'add_box');
			};
		}
	};
};

angular.module('trimark-backoffice').directive("treeviewDirective", ["$timeout", "$mdUtil", treeviewDirective]);