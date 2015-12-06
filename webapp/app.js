/*global console,angular*/
angular.module('puzzle-app', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',

    /* puzzle modules */
    'puzzle-resources',
    'puzzle-game',
    'puzzle-score',
    'puzzle-environment',
    'puzzle-game'
]);

/* Other Modules (Utility, Resources, ..) */
angular.module('puzzle-environment', []);
angular.module('puzzle-utils', []);
angular.module('puzzle-resources', ['puzzle-environment']);

/* UI Modules */
angular.module('puzzle-game', ['puzzle-resources', 'puzzle-utils']);
angular.module('puzzle-score', ['puzzle-resources']);

