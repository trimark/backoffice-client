angular.module('trimark-backoffice', [ 'ngRoute', 'ivh.treeview','ngMaterial']).
	config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider', '$httpProvider', 
		function($routeProvider, $mdIconProvider, $mdThemingProvider, $httpProvider)
	    {
			$routeProvider.when('/', {
				templateUrl: 'partials/home.html'
			});

			$routeProvider.when('/royalties-settings', {
				templateUrl: 'partials/royalties-settings.html'
			});

			$routeProvider.when('/myaccount', {
				templateUrl: 'partials/my-account.html'
			});

			$routeProvider.when('/organizations', {
				templateUrl: 'partials/organizations.html'
			});

			$routeProvider.when('/new-organization', {
				templateUrl: 'partials/new-organization.html'
			});

			$routeProvider.when('/roles', {
				templateUrl: 'partials/roles.html'
			});

			$routeProvider.when('/new-role', {
				templateUrl: 'partials/new-role.html'
			});

	        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);

	        $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('red');
	    }
	]).
	config(function(ivhTreeviewOptionsProvider) 
	{
		console.log("ivhTreeviewOptionsProvider=" + ivhTreeviewOptionsProvider);
	 	ivhTreeviewOptionsProvider.set(
	 	{
	  		defaultSelectedState: false,
	   		validate: true,
	   		expandToDepth: -1,
	   		twistieCollapsedTpl: '<md-icon md-svg-icon="img/icons/ic_chevron_right_black_24px.svg"></md-icon>',
	   		twistieExpandedTpl: '<md-icon md-svg-icon="img/icons/ic_expand_more_black_24px.svg"></md-icon>',
	   		twistieLeafTpl: '<span style="cursor: default;">&#8192;&#8192;</span>'
	   }
	   );
	}).
	directive('mdBox', function(ivhTreeviewMgr) {
	  	return {
	    restrict: 'AE',
	    template: [
	      '<span class="ascii-box">',
	        '<span ng-show="node.selected" class="x"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="true"></md-checkbox></span>',
	        '<span ng-show="node.__ivhTreeviewIndeterminate" class="y"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
	        '<span ng-hide="node.selected || node.__ivhTreeviewIndeterminate"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
	      '</span>',  
	    ].join(''),
	  //   link: function(scope, element, attrs) {
	  //     element.on('click', function() {
	  //     	console.log("stuff=" + stuff)
	  //       ivhTreeviewMgr.select(stuff, scope.node, !scope.node.selected);
	  //       scope.$apply();
	  //     });
	  //   }
	  // };
	    link: function(scope, element, attrs) {
	      element.on('click', function() {
	        scope.trvw.toggleSelected(scope.node);
	      });
	    }
	  };
	
	}).
	run(['$rootScope', 
		function($rootScope)
		{
			$rootScope.$on("$routeChangeStart",
				function (event, next, current)
				{
					if (current)
					{
						//event.preventDefault();
					}
				}
			);
		}
	]);