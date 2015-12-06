angular.module('puzzle-utils')
	.factory('Toast', Toast);

function Toast($mdToast) {
	return {
		info : function(msg) {
			$mdToast.show(
				$mdToast.simple()
					.content(msg)
					.position('top right')
					.hideDelay(3000)
			);
		},
		error : function(msg) {
			$mdToast.show(
				$mdToast.simple()
					.content(msg)
					.position('top right')
					.hideDelay(3000)
                    .theme('puzzle-error-toast')
			);
		}
	};
}
