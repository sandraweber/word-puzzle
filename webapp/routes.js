angular.module('puzzle-app')
	.config(function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'modules/puzzle-ui/enterUser.html',
				controller: 'puzzleController',
				controllerAs: 'puzzleController'
			}).
			when('/play', {
				templateUrl: 'modules/puzzle-ui/puzzle.html',
				controller: 'puzzleController',
				controllerAs: 'puzzleController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}).config(function ($sceProvider) {
		$sceProvider.enabled(false);
	});
