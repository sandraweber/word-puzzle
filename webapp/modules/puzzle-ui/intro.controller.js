angular.module('puzzle-ui').controller('introController', IntroController);

function IntroController(Puzzle, $location, $scope, SECONDS_PER_GAME, User) {

    $scope.secondsPerGame = SECONDS_PER_GAME;
    
    $scope.startGame = function(username) {
        User.set({ name: username });
        $location.path('/play');
    };
}