var menuToggleDirective = function($timeout, $mdUtil)
{
	return {
		scope: {
			data: "="
		},
		templateUrl: 'partials/menu-toggle.html',
		link: function(scope, element)
		{
			var controller = element.parent().controller();
			
			scope.onToggleMenu = function()
			{
				controller.toggleMenu(scope.data);
			};

			$mdUtil.nextTick(
				function() 
				{
					scope.$watch(
						function()
						{
							return scope.data.opened;
						},
						function(open)
						{
							$mdUtil.nextTick(
								function()
								{
									var ul = element.find('ul');
									var li = ul[0].querySelector('a.active');
									var content = document.querySelector('.bo-menu').parentNode;
									var targetHeight = open ? getTargetHeight() : 0;
									
									$timeout(
										function()
										{
											ul.css({height: targetHeight + 'px'});

											if (open && li && li.offsetParent && ul[0].scrollTop === 0) 
											{
												$timeout(
													function()
													{
														var activeHeight = li.scrollHeight;
														var activeOffset = li.offsetTop;
														var parentOffset = li.offsetParent.offsetTop;

														var negativeOffset = activeHeight * 2;
														var newScrollTop = activeOffset + parentOffset - negativeOffset;
														$mdUtil.animateScrollTo(content, newScrollTop);
													}, 
												350, false);
											}
										}, 
									0, false);
									
									function getTargetHeight()
									{
										var targetHeight;
										ul.addClass('no-transition');
										ul.css('height', '');
										targetHeight = ul.prop('clientHeight');
										ul.css('height', 0);
										ul.removeClass('no-transition');
										return targetHeight;
									}
								}, 
							false);
						}
					);
      			}
      		);
		}
	};
};

angular.module('trimark-backoffice').directive("menuToggleDirective", ["$timeout", "$mdUtil", menuToggleDirective]);