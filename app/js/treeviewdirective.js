var treeviewDirective = function($timeout, $mdUtil)
{
	return {
		restrict: 'E',
		link: function(scope, element)
		{
			var prevEl;

			scope.onItemClick = function($event)
			{
				var el = angular.element($event.currentTarget),
					li = el.parent();

				if (prevEl) 
				{
					prevEl.removeClass('active');
				}

				li.toggleClass('collapsed');
				el.toggleClass('active');

				iconName = el.find('md-icon').text();
				prevEl = el;

				el.find('md-icon').text(iconName === 'add_box' ? 'indeterminate_check_box' : 'add_box');
			};
		}
	};
};

angular.module('trimark-backoffice').directive("treeviewDirective", ["$timeout", "$mdUtil", treeviewDirective]);