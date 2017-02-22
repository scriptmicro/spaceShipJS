app.directive('endGame', function () {
    return {
        restrict: 'E',
        scope: {
            action: '&'
        },
        templateUrl: "templates/endGame.html",
        link: function(scope, element, attrs) {

			console.log("endGame");
			var endBTN = document.getElementById("endBTN");
            var container = document.getElementById("container");

			TweenMax.set(endBTN, { x: (container.clientWidth / 2) - (endBTN.clientWidth / 2), y: 0-endBTN.clientHeight});
    		//TweenMax.to(endBTN, 10, { x: (container.clientWidth / 2) - (endBTN.clientWidth / 2), y: (container.clientHeight / 2) - (endBTN.clientHeight / 2) });

            element.bind('click', function () {
            	console.log("endGame click");
                //TweenMax.set(element, { visibility: "hidden" });
                TweenMax.to(endBTN, 0.5, { x: (container.clientWidth / 2) - (endBTN.clientWidth / 2), y: 0-endBTN.clientHeight, ease:  Back.easeOut});
            });

            element.bind('mouseenter', function () {
            	console.log("endGame mouseenter");
                TweenMax.to(endBTN, 0.5, { css: { backgroundColor: "#FFFFFF" }, ease: Power2.easeOut });
            });
            element.bind('mouseleave', function () {
            	console.log("endGame mouseleave");
                TweenMax.to(endBTN, 0.5, { css: { backgroundColor: "#FF0000" }, ease: Power2.easeOut });
            });





        }
    }
});