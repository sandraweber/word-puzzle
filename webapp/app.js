/*global console,angular*/
angular.module('puzzle-app', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',

    /* puzzle modules */
    'puzzle-resources',
    'puzzle-ui',
    'puzzle-environment'
]);

/* Other Modules (Utility, Resources, ..) */
angular.module('puzzle-environment', []);
angular.module('puzzle-resources', ['puzzle-environment']);

/* UI Modules */
angular.module('puzzle-ui', ['puzzle-resources']);

