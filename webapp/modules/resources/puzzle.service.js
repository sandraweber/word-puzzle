angular.module('puzzle-resources')
	.factory('Puzzle', Puzzle);

function Puzzle($http, API_HOST) {
	return {
		create: function (user) {
			return $http.post(API_HOST + '/puzzle', {
				user: user
			});
		},
		addWord: function (puzzleId, word) {
			return $http.post(API_HOST + '/puzzle/'+puzzleId+'/addWord');
		}
	};
}
