angular.module('puzzle-ui').controller('menuController', MenuController);

function MenuController($mdSidenav, $location) {

	this.toggleSideNav = function() {
		$mdSidenav('sideNav').toggle();
	};
    
	this.openPlay = function() {
		$location.path('/');
	};
    
	this.openScore = function() {
		$location.path('/score');
	};
}