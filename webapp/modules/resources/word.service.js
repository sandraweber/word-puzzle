angular.module('puzzle-resources')
	.service('Word', Word);

function Word($http) {
	return {
		randomWord: function () {
            // TODO replace with service with better words or implement own
			return $http.get('http://randomword.setgetgo.com/get.php');
		}
	};
}
