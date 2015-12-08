angular.module('puzzle-app')
	.config(function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'modules/puzzle-game/intro.html',
				controller: 'introController'
			}).
			when('/play', {
				templateUrl: 'modules/puzzle-game/puzzle.html',
				controller: 'puzzleController',
                controllerAs: 'puzzleController',
                resolve: {
                    resolvedUser: function(User, $location) {
                        var user = User.get();
                        if (!user) {
                            $location.path('/');
                        } else {
                            return user;
                        }
                    }
                }
			}).
			when('/score', {
				templateUrl: 'modules/puzzle-score/score.html',
				controller: 'scoreController',
                controllerAs: 'scoreController',
				resolve: {
					resolvedPuzzles: function(Puzzle) {
						return Puzzle.getAll();
					}
				}
			}).
			when('/detail/:puzzleId', {
				templateUrl: 'modules/puzzle-score/detail.html',
				controller: 'detailController',
                controllerAs: 'detailController',
				resolve: {
					resolvedPuzzle: function(Puzzle, $route) {
						return Puzzle.get($route.current.params.puzzleId);
					}
				}
			}).
			otherwise({
				redirectTo: '/'
			});
	}).config(function ($sceProvider) {
		$sceProvider.enabled(false);
	});
