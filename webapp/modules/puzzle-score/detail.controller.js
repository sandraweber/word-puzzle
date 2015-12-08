angular.module('puzzle-score').controller('detailController', DetailController);

function DetailController($location, resolvedPuzzle) {
    var viewModel = this;
    
    viewModel.puzzle = resolvedPuzzle.data;
    
    viewModel.openScore = function() {
        $location.path('/score');
    };
    
    viewModel.playGame = function() {
        $location.path('/play');
    };
}