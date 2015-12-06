angular.module('puzzle-game').controller('menuController', MenuController);

function MenuController($mdSidenav, $location) {

    var viewModel = this;
    
	viewModel.toggleSideNav = function() {
		$mdSidenav('sideNav').toggle();
	};
    
	viewModel.openPlay = function() {
        viewModel.toggleSideNav();
		$location.path('/');
	};
    
	viewModel.openScore = function() {
        viewModel.toggleSideNav();
		$location.path('/score');
	};
}