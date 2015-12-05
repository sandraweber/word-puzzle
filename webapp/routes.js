angular.module('puzzle-app')
	.config(function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'modules/puzzle-ui/intro.html',
				controller: 'introController'
			}).
			when('/play', {
				templateUrl: 'modules/puzzle-ui/puzzle.html',
				controller: 'puzzleController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}).config(function ($sceProvider) {
		$sceProvider.enabled(false);
	});
