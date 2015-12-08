angular.module('puzzle-game').controller('puzzleController', PuzzleController);

function PuzzleController($interval, $location, $filter, Toast, SECONDS_PER_GAME, Word, Puzzle, resolvedUser, ScoreCalculator) {
    
    var viewModel = this;
    
    viewModel.puzzle = {
            timestamp: new Date(),
            user: resolvedUser,
            words: [],
            totalScore: 0
        };
    viewModel.seconds = SECONDS_PER_GAME;
    viewModel.maxSeconds = SECONDS_PER_GAME;
    viewModel.currentWord = {
                word: undefined,
                shuffledWord: undefined,
                maxScore: undefined,
                score: undefined
            };
    
    viewModel.input = '';
    viewModel.deletedChars = 0;
    
    viewModel.submitWord = submitWord;
    viewModel.nextWord = nextWord;
    viewModel.trackBackspaces = trackBackspaces;
    
    startGame();

    function startGame() {
        nextWord(startTimer);
    }
    
    function startTimer() {
        $interval(function() {
            if (viewModel.seconds === 0) {
                stopGame();
            } else {
                viewModel.seconds--;
            }
        }, 1000, SECONDS_PER_GAME+1);
    }
    
    function submitWord(input) {
        if (input === viewModel.currentWord.word) {
            viewModel.puzzle.words.push(viewModel.currentWord);
            viewModel.puzzle.totalScore += viewModel.currentWord.score;
            nextWord();
            Toast.info('Correct! The word is '+input+'.');
        } else {
            Toast.error('Wrong! '+input+' is not what we are looking for.');
        }
    }
    
    function trackBackspaces(word) {
        switch(event.keyCode) {
            case 8: // backspace
            case 46: // deleted
                viewModel.deletedChars++;
                viewModel.currentWord.score = ScoreCalculator.calculate(viewModel.currentWord.word, viewModel.deletedChars);
                break;
            default:
                break;
        }
    }
    
    function nextWord(callback) {
        Word.randomWord().success(function(result) {
            
            var maxScore = ScoreCalculator.calculate(result.word, 0);
            viewModel.currentWord = {
                word: result.word,
                shuffledWord: $filter('shuffle')(result.word),
                maxScore: maxScore,
                score: maxScore
            };
            
            viewModel.input = '';
            viewModel.deletedChars = 0;
            
            if (callback) callback();
        });
    }
    
    function stopGame() {
        Toast.info('You finished with a total score of '+viewModel.puzzle.totalScore);
        Puzzle.create(viewModel.puzzle).success(function(result) {
            $location.path('/detail/'+result._id);
        });
    }
}