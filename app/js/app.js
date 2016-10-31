angular.module('trimark-backoffice', [ 'ngRoute', 'ngMaterial']).
	config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider', '$httpProvider', 
		function($routeProvider, $mdIconProvider, $mdThemingProvider, $httpProvider)
	    {
			$routeProvider.when('/', {
				templateUrl: 'partials/home.html'
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