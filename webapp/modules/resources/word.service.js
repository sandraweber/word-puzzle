angular.module('puzzle-resources')
	.service('Word', Word);

function Word($http, API_HOST) {
	return {
		randomWord: function () {
			return $http.get(API_HOST + 'word');
		}
	};
}
