angular.module('puzzle-resources')
	.service('Puzzle', Puzzle);

function Puzzle($http, API_HOST) {
	return {
		create: function (puzzle) {
			return $http.post(API_HOST + 'puzzle', puzzle);
		},
		get: function (puzzleId) {
			return $http.get(API_HOST + 'puzzle/'+puzzleId);
		},
		getAll: function () {
			return $http.get(API_HOST + 'puzzle');
		}
	};
}
