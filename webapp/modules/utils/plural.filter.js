angular.module('puzzle-utils').filter('plural', function() {
    return function(input) {
        if (input > 1) {
            return 's';
        } else {
            return '';
        }
    };
});