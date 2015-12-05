angular.module('puzzle-ui').filter('shuffle', function() {
    return function(input) {
        var shuffledInput = input.split('');
        for(var i = input.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffledInput[i];
            shuffledInput[i] = shuffledInput[j];
            shuffledInput[j] = tmp;
        }
        return shuffledInput.join('') ;
    };
});