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
				templateUrl: 'partials/list-organizations.html'
			});

			$routeProvider.when('/organization/:parentOrganizationId/:organizationId', {
				templateUrl: 'partials/organization.html'
			});

			$routeProvider.when('/roles', {
				templateUrl: 'partials/list-roles.html'
			});

			$routeProvider.when('/role/:roleId', {
				templateUrl: 'partials/role.html'
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