

var spaceShip;
var game;
var container;
var gameHUD
var barContainer;
var shieldMeter;
var healthMeter;

function init() {

    //startBTN = document.getElementById("startBTN");
    gameHUD = document.getElementById("gameHUD");
    barContainer = document.getElementById("barContainer");

    game = document.getElementById("game");
    container = document.getElementById("container");
    spaceShip = document.getElementById("spaceShip");

    TweenMax.set(gameHUD, { alpha: 0 });// could chnage this to set

    var middleX = (container.clientWidth / 2) - (spaceShip.clientWidth / 2);
    var middleY = (container.clientHeight / 2) - (spaceShip.clientHeight / 2);

    TweenMax.set(spaceShip, { x: (container.clientWidth / 2) - (spaceShip.clientWidth / 2), y: (container.clientHeight / 2) - (spaceShip.clientHeight / 2) });
    //TweenMax.set(spaceShip, { alpha: 0, rotation: 25, scaleX: 0.5, scaleY: 0.5, x: ((viewportHeight() / 2) - (spaceShip.clientHeight/2)), y: ((viewportWidth() / 2) - (spaceShip.clientWidth / 2)) });
    //TweenMax.set(spaceShip, { visibility: "visible" });

    loadFunction();
}

function ready() {
    console.log("ready");
}


function loadFunction() {
    console.log("loadFunction");
    TweenMax.to(document.body, 2, { css: { backgroundColor: "#FFFFFF" }, ease: Power2.easeOut });
    animatespaceShipIn();
}

function animatespaceShipIn() {
    console.log("animatespaceShipIn");
    TweenMax.killTweensOf(spaceShip);
    TweenMax.to(spaceShip, 0.2, {alpha:1, rotation:0, ease: Power3.easeOut, onComplete: hangOutInMiddle});
}

function hangOutInMiddle(params) {
    console.log("hangOutInMiddle");
    TweenMax.to(spaceShip, 0.8, { scaleX: 1, scaleY: 1, ease: Power3.easeIn, ease: Elastic.easeOut });//repeat: 0, yoyo: false,
    TweenMax.to(document.body, 1.5, { css: { backgroundColor: "#32383d" }, ease: Elastic.easeOut });
}


function resize() {
    var w = window.outerWidth;
    var h = window.outerHeight;
    var txt = "resize ::: width=" + w + ", height=" + h;

    //console.log(txt);
}







function mouseMonitor(e) {
    var x = e.pageX;
    var y = e.pageY;

    var spaceShipRect = spaceShip.getBoundingClientRect();
    //console.log(spaceShipRect.top, spaceShipRect.right, spaceShipRect.bottom, spaceShipRect.left);

    // TODO creat a utility JS file that has a find center of object function
    TweenMax.set(spaceShip, { rotation: findAngle(x, y, spaceShipRect.left + (spaceShipRect.width / 2), spaceShipRect.top + (spaceShipRect.height / 2)) + 90 });

    //console.log(x, y);

    //console.log("spaceShip.rotation ::: " + spaceShip._gsTransform.rotation);

    return spaceShip._gsTransform.rotation;
}



app.controller('scriptMicroControl', function ($scope, $interval) {
    //http://www.gamedev.net/page/resources/_/technical/game-programming/anatomy-of-an-idle-game-a-starters-guide-to-angularjs-r3767

    $scope.gameLoopCount = 0;

    $scope.keys = [];

    $scope.weaponsfired = [];

    $scope.badGuysList = [];

    $scope.boomList = [];

    $scope.stageHeight = viewportHeight();

    $scope.stageWidth = viewportWidth();

    $scope.mouseX = 0;

    $scope.mouseY = 0;

    $scope.spaceShip={xspeed:0, yspeed:0, angle:0, power:1.9, friction:0.89, shield:100, health:100, width:100, height:100, isAlive:false};

    $scope.hasStarted = false;

    $scope.begin = function(){
        console.log("begin");
    }

    $scope.createBadGuys = function(){
        for (i = 0; i < 3; i++) {
            $scope.badGuysList.push(
                buildBadGuy(
                    Math.random() * ($scope.stageWidth - 50), 
                    Math.random() * ($scope.stageHeight - 50), 
                    Math.random(), 
                    Math.random(), 
                    1
                )
            );
        }

        $scope.badGuysList.push(buildBadGuy(Math.random() * ($scope.stageWidth - 75), Math.random() * ($scope.stageHeight - 75), Math.random(), Math.random(), 2));
        $scope.badGuysList.push(buildBadGuy(Math.random() * ($scope.stageWidth - 75), Math.random() * ($scope.stageHeight - 75), Math.random(), Math.random(), 2));

        $scope.badGuysList.push(buildBadGuy(Math.random() * ($scope.stageWidth - 100), Math.random() * ($scope.stageHeight - 100), Math.random(), Math.random(), 3));
        $scope.badGuysList.push(buildBadGuy(Math.random() * ($scope.stageWidth - 100), Math.random() * ($scope.stageHeight - 100), Math.random(), Math.random(), 3));
    }
    /*
    $scope.spaceShip.xspeed=0;
    $scope.spaceShip.yspeed=0;
    $scope.spaceShip.angle=0;
    $scope.spaceShip.power=1.9;
    $scope.spaceShip.friction=0.89;
    */


    $scope.startBTNHandler = function (event) {
        console.log("startBTNHandler");

        $scope.hasStarted = true;
        $scope.spaceShip.isAlive = true;
        TweenMax.to(gameHUD, 0.5, { alpha: 1 });// could chnage this to set
        $scope.spaceShip.shield = 100;
        $scope.spaceShip.health = 100;
        TweenMax.set(spaceShip, { visibility: "visible" });
    }

    $scope.endBTNHandler = function (event) {
        console.log("endBTNHandler");
        console.log("endBTNHandler ::: " + $scope.badGuysList.length);
        if($scope.badGuysList.length > 0){
            for (var i = $scope.badGuysList.length -1; i >= 0;  i--) {
                //$scope.badGuysList[i].health = 0;
                applyDamageToBadGuy(i, 100);
            }
        }


/*
        $scope.badGuysList = [];

        $scope.hasStarted = true;
        $scope.spaceShip.isAlive = true;
        $scope.spaceShip.shield = 100;
        $scope.spaceShip.health = 100;
        TweenMax.set(spaceShip, { visibility: "visible" });
*/

        //TweenMax.set(endBTN, { visibility: "hidden" });



        
        TweenMax.to(gameHUD, 0.5, { alpha: 0 });


        //well, this isnt very angularJSie
        var startBTN = document.getElementById("startBTN");
        TweenMax.to(startBTN, 0.5, { x: (container.clientWidth / 2) - (startBTN.clientWidth / 2), y: (container.clientHeight / 2) - (startBTN.clientHeight / 2), ease:  Back.easeOut});

        TweenMax.to(document.body, 1.5, { css: { backgroundColor: "#32383d" }, ease: Elastic.easeOut });

        //I want to bring out the start game button
    }


    $scope.mouseMonitor = function (event) {
        $scope.spaceShip.angle = mouseMonitor(event);
    }




    $scope.mouseClick = function (event) {

        var x = $scope.mouseX = event.pageX;
        var y = $scope.mouseY = event.pageY;

        $scope.spaceShip.angle = mouseMonitor(event);

        emitWeapon();

    }


    function emitWeapon(){

        //TODO : short term : 3 round burst, rapid fire

        //TODO : log term : weapons manager ... weapon selected? weapons upgrades

        var angle = findAngle($scope.mouseX, $scope.mouseY, $scope.spaceShip.x + ($scope.spaceShip.width / 2), $scope.spaceShip.y + ($scope.spaceShip.height / 2));

        console.log("mouseClick ::: angle= " + angle);

        var radians = angle * Math.PI / 180;

        console.log("mouseClick ::: $scope.spaceShip.x= " + $scope.spaceShip.x);
        console.log("mouseClick ::: $scope.spaceShip.y= " + $scope.spaceShip.y);


        //plus 50 for the center of the spaceship
        //times 60 for the distance away from center... i guess
        var x = ($scope.spaceShip.x + ($scope.spaceShip.width / 2)) + Math.cos(radians) * ($scope.spaceShip.width / 2);
        var y = ($scope.spaceShip.y + ($scope.spaceShip.height / 2)) + Math.sin(radians) * ($scope.spaceShip.height / 2);

        var currentWeapon = buildShape(x, y, Math.cos(radians), Math.sin(radians));

        $scope.weaponsfired.push(currentWeapon);

        //TweenMax.set(currentWeapon, { rotation: angle });// for some resom doesnt work// makes me want to create a directive with a template with div tag.

        console.log("mouseClick ::: x= " + x + ", y= " + y);

    }

    $scope.keydown = function ($event) {
        if ($scope.keys.indexOf($event.keyCode) == -1) {
            $scope.keys.push($event.keyCode);
        }

        console.log("keys ::: " + $scope.keys);

    }

    $scope.keyup = function ($event) {

        var i = $scope.keys.indexOf($event.keyCode);

        if (i > -1) {
            $scope.keys.splice(i, 1);
        }
        console.log("keys ::: " + $scope.keys);
    }

    function applyDamageToSpaceShip(amount) {

        if ($scope.spaceShip.shield > 0) {
            //TODO : play shieled animation tint the ship blue and back to white
            if ($scope.spaceShip.shield - amount > 0) {
                $scope.spaceShip.shield -= amount;
            } else {
                var amountToCarryOverToHealthDamage = amount - $scope.spaceShip.shield;
                $scope.spaceShip.shield = 0;

                $scope.spaceShip.health -= amountToCarryOverToHealthDamage;
                ////..TweenMax.to(healthMeter, 0.5, { width: $scope.spaceShip.health + "%" })
            }
            ////..TweenMax.to(shieldMeter, 0.5, { width: $scope.spaceShip.shield + "%" });
        } else if ($scope.spaceShip.health > 0) {
            //TODO : play shieled animation tint the ship red and back to white
            if ($scope.spaceShip.health - amount > 0) {
                $scope.spaceShip.health -= amount;
            } else {
                $scope.spaceShip.health = 0;
            }
            ////..TweenMax.to(healthMeter, 0.5, { width: $scope.spaceShip.health + "%" });
        } else {
            console.log("YOUR DEAD");

            if($scope.spaceShip.isAlive == true){
                $scope.spaceShip.isAlive = false;
                var middleX = (container.clientWidth / 2) - (spaceShip.clientWidth / 2);
                var middleY = (container.clientHeight / 2) - (spaceShip.clientHeight / 2);

                TweenMax.set(spaceShip, { visibility: "hidden" });
                $scope.keys = [];

                $scope.spaceShip.xspeed = 0;
                $scope.spaceShip.yspeed = 0;
                $scope.spaceShip.angle = 0;

                //here I want o make a super nova circle animation that expands and fads (ALPHA OUT) fast at the end. I used to has a frame tween in flash back in the day
                for (var i = 0; i < 20; i++){
                   $scope.boomList.push(buildBoom($scope.spaceShip.x + getRandomInt(2,-2), $scope.spaceShip.y + getRandomInt(2,-2), $scope.spaceShip.xspeed += getRandomInt(7,-7), $scope.spaceShip.yspeed += getRandomInt(7,-7), 2));
                }

                blowUpAround($scope.spaceShip, 400);//still is 400 and can be depending on battery charge or super weapon recgarge percentage

                //TODO : I might want to do this after start game cause of bad guys who shoot at your dead body
                TweenMax.set(spaceShip, { x: middleX, y: middleY });



                TweenMax.to(document.body, 1.5, { css: { backgroundColor: "#8b0000" }, ease: Elastic.easeOut });

            }
        }
    }


    function blowUpAround(objectBlowingUp, distance){

        //TODO : add a no/low damage shock wave (distance+50) that just moves the badguys in the opposite direction as the ship.

        for (var i = $scope.badGuysList.length -1; i >= 0;  i--) {
            var hypotinuse = findHypotenuse($scope.badGuysList[i].x+($scope.badGuysList[i].width/2), $scope.badGuysList[i].y+($scope.badGuysList[i].height/2) , objectBlowingUp.x + (objectBlowingUp.width/2), objectBlowingUp.y + (objectBlowingUp.height/2));
            if (Math.abs(hypotinuse) < distance)
            {
                console.log("blowUpAround ::: " + i + " hypotinuse ::: " + hypotinuse);
                $scope.badGuysList[i].xspeed +=  ($scope.badGuysList[i].x - objectBlowingUp.x)/5 + objectBlowingUp.xspeed>>1;
                $scope.badGuysList[i].yspeed +=  ($scope.badGuysList[i].y - objectBlowingUp.y)/5 + objectBlowingUp.yspeed>>1;
                
                //$scope.badGuysList[i].health -=  222;//objectBlowingUp.damage;

                applyDamageToBadGuy(i, 100);//TODO: need to be percentage based (distane, weapon type.etc) and use math to adjust the damage in a graduated way
                
                //undefined
                if ($scope.badGuysList[i] != undefined && $scope.badGuysList[i].health > 0)
                {
                    //badGuyBarFade($scope.badGuysList[i].myLifeBar);
                    //barScale($scope.badGuysList[i].myLifeBar.bar,$scope.badGuysList[i].health,$scope.badGuysList[i].healthTotal);
                }
            }
        }
    }

    function applyDamageToBadGuy(whichGuy, damageAmount){
        console.log("gamapplyDamageToBadGuyeLoop damageAmount::: " + damageAmount);
        console.log("applyDamageToBadGuy whichGuy::: " + whichGuy);
        
        $scope.badGuysList[whichGuy].health-= damageAmount;

        if($scope.badGuysList[whichGuy].health <= 0){

            var x = $scope.badGuysList[whichGuy].x;
            var y = $scope.badGuysList[whichGuy].y;

            var xspeed = $scope.badGuysList[whichGuy].xspeed;
            var yspeed = $scope.badGuysList[whichGuy].yspeed;

            $scope.badGuysList.splice(whichGuy, 1);
            //replace bag guy with boom1 and 2 or 3
            //$scope.boomList.push(buildBoom(x, y, xspeed, yspeed, 1));

            $scope.boomList.push(buildBoom(x + getRandomInt(2,-2), y + getRandomInt(2,-2), xspeed, yspeed, 1));

            for (var i = 0; i < 6; i++){
               $scope.boomList.push(buildBoom(x + getRandomInt(2,-2), y + getRandomInt(2,-2), xspeed *= getRandomInt(1,-1), yspeed *= getRandomInt(1,-1), 2));
            }

        }
        

    }


    function gameLoop() {
        //console.log("gameLoop ::: " + $scope.gameLoopCount);
        $scope.gameLoopCount++;
        
        if($scope.badGuysList.length == 0 && $scope.spaceShip.isAlive == true){
            $scope.createBadGuys();
        }
        
        handleSpaceShipWeapons();

        loopBadGuysAndSpaceShip();

        if($scope.spaceShip.isAlive == true){
            controlSpaceShip();
        }
        
        loopBadGuysAndWeaponsFired();

        loopBoomList();

        //this is kinda crappy, need a change for sure, but gets the delayed dezired effect on weapens points
        if($scope.spaceShip.isAlive == false && $scope.weaponsfired.length == 0 && $scope.hasStarted == true){
            $scope.hasStarted = false;
            console.log("GAME OVER!");

            //I guess this is needed cause the ship carries some x y speed over from the loop and update race.
            $scope.spaceShip.xspeed = 0;
            $scope.spaceShip.yspeed = 0;

            

            

            TweenMax.set(endBTN, { x: (container.clientWidth / 2) - (endBTN.clientWidth / 2), y: 0-endBTN.clientHeight});
            TweenMax.set(endBTN, { visibility: "visible" });
            TweenMax.to(endBTN, 0.5, { x: (container.clientWidth / 2) - (endBTN.clientWidth / 2), y:(container.clientHeight / 2) - (endBTN.clientHeight / 2), delay:2, ease: Back.easeOut});

            //TweenMax.set(gameHUD, { alpha: 0 });
        }


    }
    var timer = $interval(gameLoop, 20);//50 fps its a little fast, but i like it!


    function controlSpaceShip(){
                //keyboard input checks

        if ($scope.keys.indexOf(39) > -1 || $scope.keys.indexOf(68) > -1) {
            $scope.spaceShip.xspeed += $scope.spaceShip.power;
        }
        if ($scope.keys.indexOf(37) > -1 || $scope.keys.indexOf(65) > -1) {
            $scope.spaceShip.xspeed -= $scope.spaceShip.power;
        }
        if ($scope.keys.indexOf(38) > -1 || $scope.keys.indexOf(87) > -1) {
            $scope.spaceShip.yspeed -= $scope.spaceShip.power;
        }
        if ($scope.keys.indexOf(40) > -1 || $scope.keys.indexOf(83) > -1) {
            $scope.spaceShip.yspeed += $scope.spaceShip.power;
        }

        //spaceShip movement
        if (0 > spaceShip._gsTransform.y) {
            $scope.spaceShip.yspeed = $scope.spaceShip.yspeed * 1.3;
            $scope.spaceShip.yspeed *= -1;

            applyDamageToSpaceShip(5);
        }
        if (container.clientHeight < (spaceShip._gsTransform.y + 100)) {
            $scope.spaceShip.yspeed = $scope.spaceShip.yspeed * 1.3;
            $scope.spaceShip.yspeed *= -1;

            applyDamageToSpaceShip(5);
        }
        if (container.clientWidth< (spaceShip._gsTransform.x + 100)) {
            $scope.spaceShip.xspeed = $scope.spaceShip.xspeed * 1.3;
            $scope.spaceShip.xspeed *= -1;

            applyDamageToSpaceShip(5);
        }
        if (0 > spaceShip._gsTransform.x) {
            $scope.spaceShip.xspeed = $scope.spaceShip.xspeed * 1.3;
            $scope.spaceShip.xspeed *= -1;

            applyDamageToSpaceShip(5);
        }

        $scope.spaceShip.xspeed *= $scope.spaceShip.friction;
        $scope.spaceShip.yspeed *= $scope.spaceShip.friction;

        if ($scope.spaceShip.xspeed < 0.1 && $scope.spaceShip.xspeed > -0.1) {
            $scope.spaceShip.xspeed = 0;
        }
        if ($scope.spaceShip.yspeed < 0.1 && $scope.spaceShip.yspeed > -0.1) {
            $scope.spaceShip.yspeed = 0;
        }


        $scope.spaceShip.x = Math.round(spaceShip._gsTransform.x);
        $scope.spaceShip.y = Math.round(spaceShip._gsTransform.y);

        TweenMax.set(spaceShip, { x: spaceShip._gsTransform.x + Math.round($scope.spaceShip.xspeed) });
        TweenMax.set(spaceShip, { y: spaceShip._gsTransform.y + Math.round($scope.spaceShip.yspeed) });
    }


    function handleSpaceShipWeapons(){

        //handle space ship weapons
        for (var i = $scope.weaponsfired.length-1; i >= 0; i--) {

            var currentWeapon = $scope.weaponsfired[i]

            $scope.weaponsfired[i].x += $scope.weaponsfired[i].xspeed;
            $scope.weaponsfired[i].y += $scope.weaponsfired[i].yspeed;

            //handle walls
            
            if (0 > $scope.weaponsfired[i].y) {
                $scope.weaponsfired[i].yspeed = $scope.weaponsfired[i].yspeed * 1.3;
                $scope.weaponsfired[i].yspeed *= -1;
            }
            if (container.clientHeight < ($scope.weaponsfired[i].y + 5)) {
                $scope.weaponsfired[i].yspeed =$scope.weaponsfired[i].yspeed * 1.3;
                $scope.weaponsfired[i].yspeed *= -1;
            }
            if (container.clientWidth < ($scope.weaponsfired[i].x + 5)) {
               $scope.weaponsfired[i].xspeed = $scope.weaponsfired[i].xspeed * 1.3;
                $scope.weaponsfired[i].xspeed *= -1;
            }
            if (0 > $scope.weaponsfired[i].x) {
                $scope.weaponsfired[i].xspeed = $scope.weaponsfired[i].xspeed * 1.3;
                $scope.weaponsfired[i].xspeed *= -1;
            }
            


            if ($scope.weaponsfired[i].health <= 0) {
                $scope.weaponsfired.splice(i, 1);
            }else{
                $scope.weaponsfired[i].health -= 0.5;
            }

        }

    }


    function loopBadGuysAndSpaceShip(){
        for (var i = $scope.badGuysList.length -1; i >= 0;  i--) {

            if($scope.badGuysList[i].xspeed > 1 )
            {
                $scope.badGuysList[i].xspeed *= 0.89;
            }
            if($scope.badGuysList[i].yspeed > 1 )
            {
                $scope.badGuysList[i].yspeed *= 0.89;
            }

            $scope.badGuysList[i].control();

            if($scope.spaceShip.isAlive == true){
                //Check space ship against each bad guy
                var hypotenuse = findHypotenuse($scope.spaceShip.x+50, $scope.spaceShip.y+50, $scope.badGuysList[i].x+($scope.badGuysList[i].width/2), $scope.badGuysList[i].y+($scope.badGuysList[i].height/2));
                var radiusCombined = 50 + ($scope.badGuysList[i].width/2); //$scope.spaceShip.width/2 + $scope.badGuysList[i].width/2;
                if(hypotenuse <= radiusCombined){

                    $scope.badGuysList[i].xspeed += $scope.spaceShip.xspeed;
                    $scope.badGuysList[i].yspeed += $scope.spaceShip.yspeed;

                    applyDamageToSpaceShip(5);

                    applyDamageToBadGuy(i, 5);//spaceship shield damage or health damage

                    //TODO : applyDamageToBadGuy($scope.badGuysList[i] $scope.spaceShip.damage)
                    //$scope.badGuysList.splice(i, 1);
                }
            }
        }
    }


    function loopBadGuysAndWeaponsFired(){
        for (var wf = $scope.weaponsfired.length-1; wf >=0; wf--) {
            //console.log("weaponsfired ::: " + wf + " - " +$scope.weaponsfired.length);
            for (var i = $scope.badGuysList.length-1; i >=0; i--) {
            //console.log("badGuysList ::: " + i + " - " +$scope.badGuysList.length);

                if($scope.weaponsfired[wf] == undefined ) {
                    console.log("$scope.weaponsfired[wf] == undefined " + wf);
                }else{

                    var hypotenuse = findHypotenuse($scope.weaponsfired[wf].x+2.5, $scope.weaponsfired[wf].y+2.5, $scope.badGuysList[i].x+($scope.badGuysList[i].width/2), $scope.badGuysList[i].y+($scope.badGuysList[i].width/2));
                    var radiusCombined = 2.5 + ($scope.badGuysList[i].width/2); //$scope.spaceShip.width/2 + $scope.badGuysList[i].width/2;
                    if(hypotenuse <= radiusCombined){

                        $scope.badGuysList[i].xspeed += $scope.weaponsfired[wf].xspeed;
                        $scope.badGuysList[i].yspeed += $scope.weaponsfired[wf].yspeed;

                        applyDamageToBadGuy(i, $scope.weaponsfired[wf].damage);
                        

                        for (var i = 0; i < getRandomInt(3, 1); i++){
                           $scope.boomList.push(buildBoom($scope.weaponsfired[wf].x + getRandomInt(2,-2), $scope.weaponsfired[wf].y + getRandomInt(2,-2), (($scope.weaponsfired[wf].xspeed + getRandomInt(2,-2))*-1)/3, (($scope.weaponsfired[wf].yspeed + getRandomInt(2,-2))*-1)/3, 2));
                        }
                        $scope.weaponsfired.splice(wf, 1);
                    }
                }
            }
        }
    }




    function loopBoomList(){

        for (var i = 0; i < $scope.boomList.length; i++) {

            $scope.boomList[i].xspeed *= 0.89;
            $scope.boomList[i].yspeed *= 0.89;

            //$scope.boomList[i].x += $scope.boomList[i].xspeed;
            //$scope.boomList[i].y += $scope.boomList[i].yspeed;
            $scope.boomList[i].control();

            if ($scope.boomList[i].health <= 0) {
                $scope.boomList.splice(i, 1);
            }else{
                $scope.boomList[i].health -= 5;
            }
        }
    }














    





    // Publish list of shapes on the $scope/presentationModel


    
});


