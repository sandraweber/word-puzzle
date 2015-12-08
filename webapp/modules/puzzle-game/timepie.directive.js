angular.module('puzzle-game').directive('timePie', function(COLORS_ACCENT) {
  return {
    restrict: 'E',
    scope: {
      left: '@left',
      total: '@total'
    },
    template: '<div class="puzzle-time-pie" ng-style="{\'background-image\': style }"></div>',
    link: function(scope, element, attrs) {
        var total = attrs.total;
        
        // Watch the value over time.
        attrs.$observe(
            'left',
            calculateStyle
        );
        
        calculateStyle(attrs.left)
        
        function calculateStyle( left ) {
            var relativeValue = left/total;
            var degree = relativeValue * 360;
            var accentColor = COLORS_ACCENT;
            var firstGradient;
            if (relativeValue >= 0.5) {
                firstGradient = 'linear-gradient('+(270-degree)+'deg, white 50%, transparent 50%)';
            } else {
                firstGradient = 'linear-gradient('+(90-degree)+'deg, '+accentColor+' 50%, transparent 50%)';
            }
            scope.style = firstGradient+', linear-gradient(90deg, white 50%, transparent 50%)';
        }
    }
  };
});