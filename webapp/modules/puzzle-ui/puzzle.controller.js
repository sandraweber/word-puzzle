angular.module('puzzle-ui').controller('puzzleController', PuzzleController);

function PuzzleController($scope, $interval, $location, $filter, Toast, SECONDS_PER_GAME, Word, Puzzle, User) {
    if (!User.get()) {
        $location.path('/');
    } else {
        startGame();
    }

    function startGame() {
        $scope.seconds = SECONDS_PER_GAME;
        $scope.puzzle = {
            username: User.get().name,
            words: [],
            totalScore: 0
        }

        createNewRandomWord();
        $interval(function() {
            if ($scope.seconds === 0) {
                stopGame();
            } else {
                $scope.seconds--;
            }
        }, 1000, SECONDS_PER_GAME+1);
    }
    
    $scope.submitWord = function(word) {
        if (word === $scope.randomWord) {
            $scope.puzzle.words.push({
                word: word,
                shuffledWord: $scope.randomWordShuffled,
                score: $scope.score
            });
            $scope.puzzle.totalScore += $scope.score;
            createNewRandomWord();
            Toast.info('Correct! The word is '+word+'.');
        } else {
            Toast.error('Wrong! '+word+' is not what we are looking for.');
        }
    };
    
    $scope.trackBackspaces = function(word) {
        switch(event.keyCode) {
            case 8: // backspace
            case 46: // deleted
                $scope.deletedChars++;
                recalculateScore();
                break;
            default:
                break;
        }
    };
    
    function recalculateScore() {
        var n = Math.max(0, $scope.randomWord.length - $scope.deletedChars);
        $scope.score = Math.floor(Math.pow(1.95, n/3));
    }
    
    function createNewRandomWord() {
        Word.randomWord().success(function(randomWord) {
            $scope.randomWord = randomWord;
            $scope.word = '';
            $scope.deletedChars = 0;
            $scope.randomWordShuffled = $filter('shuffle')($scope.randomWord);
            recalculateScore();
            $scope.maxScore = $scope.score;
        });
    }
    
    function stopGame() {
        Puzzle.create($scope.puzzle, function(result) {  
            Toast.info('You finished with a total score of '+$scope.totalScore);
            $location.path('/');
        });
    }
}