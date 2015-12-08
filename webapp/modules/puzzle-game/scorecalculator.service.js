angular.module('puzzle-game').service('ScoreCalculator', ScoreCalculator);

function ScoreCalculator() {
    return {
        calculate: function(word, charsDeleted) {
            var maxScore = Math.floor(Math.pow(1.95, word.length/3));
            return Math.max(0, maxScore-charsDeleted);
        }
    };
}