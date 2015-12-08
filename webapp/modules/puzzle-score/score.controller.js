angular.module('puzzle-score').controller('scoreController', ScoreController);

function ScoreController($location, resolvedPuzzles) {
    var viewModel = this;
    
    viewModel.puzzles = resolvedPuzzles.data;
    
    viewModel.playGame = function() {
        $location.path('/play');
    };
    
    viewModel.openScoreInDetail = function(puzzle) {
        $location.path('/detail/'+puzzle._id);
    };
}