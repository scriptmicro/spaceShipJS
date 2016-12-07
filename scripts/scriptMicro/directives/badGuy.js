app.directive('badGuy', function () {
    return {
        restrict: 'E',
        scope: {
            datasource: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch("datasource.health", function(newValue, oldValue) {

                //console.log("I see a data change!");
                    
                if (newValue < 100){
                    //TweenMax.set(element, {backgroundColor:0xFF0000});
                    //TweenMax.to(element, 0.5, {backgroundColor:"none"});

                    TweenMax.set(element, {brightness:2});
                    TweenMax.to(element, 0.5, {brightness:0});
                }
            }, true);
        },
        templateUrl: "templates/badGuy.html"
    }
});