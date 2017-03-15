
class Shape {

    x:number;
    y:number;
    health:number;
    power:number;
    friction:number;
    damage:number;
    xspeed:number;
    yspeed:number;
    rotation:number;
    rotationAmount:number;
    image:string;
    score:number;

    width:number;
    height:number;

    control = function (shapeWidth:number) {


    };
}






function buildShape(newX:number, newY:number, newXSpeed:number, newYSpeed:number):Shape {

    let shape:Shape = new Shape();
    //weapon.color = '#' + 0xFFFFFF; //+ (Math.random() * 0xFFFFFF << 0).toString(16);
    shape.x = newX;
    shape.y = newY;
    

    shape.health = 100;
    shape.power = 6;
    shape.friction = 0.89;
    shape.damage = 20;

    //shape.image - "";
    //shape.width = 0;
    //shape.height = 0;

    shape.xspeed = shape.power * newXSpeed;
    shape.yspeed = shape.power * newYSpeed;

    shape.rotation = Math.random() * 360;
    shape.rotationAmount = Math.random()*2 - 1;

    shape.control = function (shapeWidth) {

        if (0 > shape.y) {
            shape.y = 0
            shape.yspeed *= -1;
        }
        if (container.clientHeight < (shape.y + shapeWidth)) {
            shape.y = container.clientHeight - shapeWidth;
            shape.yspeed *= -1;
        }
        if (container.clientWidth < (shape.x + shapeWidth)) {
            shape.x = container.clientWidth - shapeWidth;
            shape.xspeed *= -1;
        }
        if (0 > shape.x) {
            shape.x = 0
            shape.xspeed *= -1;
        }


        shape.x += shape.xspeed;
        shape.y += shape.yspeed;
        

    };


    return shape;
};



function buildBadGuy(newX:number, newY:number, newXSpeed:number, newYSpeed:number, type:number):Shape {//type = 1

    let shape:Shape = new Shape();
    //weapon.color = '#' + 0xFFFFFF; //+ (Math.random() * 0xFFFFFF << 0).toString(16);
    shape.x = newX;
    shape.y = newY;
    

    shape.health = 100;
    shape.power = 6;
    shape.friction = 0.89;
    shape.damage = 20;

    if(type == 1){
        shape.image = "images/bolder-50.png";
        shape.width = 50;
        shape.height = 50;
        shape.score = 50;
    }else if(type == 2){
        shape.image = "images/bolder-75.png";
        shape.width = 75;
        shape.height = 75;
        shape.score = 75;
    }else if(type == 3){
        shape.image = "images/bolder-100.png";
        shape.width = 100;
        shape.height = 100;
        shape.score = 100;
    }

    shape.xspeed = shape.power * newXSpeed;
    shape.yspeed = shape.power * newYSpeed;

    shape.rotation = Math.random() * 360;
    shape.rotationAmount = getRandomInt(3, -3);

    shape.control = function () {

        if (0 > shape.y) {
            shape.y = 0
            shape.yspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (container.clientHeight < (shape.y + shape.height)) {
            shape.y = container.clientHeight - shape.height;
            shape.yspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (container.clientWidth < (shape.x + shape.width)) {
            shape.x = container.clientWidth - shape.width;
            shape.xspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (0 > shape.x) {
            shape.x = 0
            shape.xspeed *= -1;
            shape.rotationAmount *= -1;
        }

        if(shape.rotation + shape.rotationAmount > 360){
            shape.rotation -= 360;
        }else if(shape.rotation + shape.rotationAmount < 0){
            shape.rotation += 360;
        }else{
            shape.rotation += shape.rotationAmount;
        }
/*
        //I dont know about this being what i want
        if(Math.abs(shape.xspeed) > 6){
            shape.xspeed *= shape.friction;
        }
        if(Math.abs(shape.yspeed) > 6){
            shape.yspeed *= shape.friction;
        }
*/
        shape.x += shape.xspeed;
        shape.y += shape.yspeed;
    };

    return shape;
};



function buildBoom(newX:number, newY:number, newXSpeed:number, newYSpeed:number, type:number):Shape {//type = 1

    let shape:Shape = new Shape();
    //weapon.color = '#' + 0xFFFFFF; //+ (Math.random() * 0xFFFFFF << 0).toString(16);
    shape.x = newX;
    shape.y = newY;
    

    shape.health = 100;
    shape.power = 6;
    shape.friction = 0.89;
    shape.damage = 20;

    if(type == 1){
        shape.image = "images/boom"+getRandomInt(2, 1)+".png";
        shape.width = 100;
        shape.height = 100;
    }else if(type == 2){
        shape.image = "images/spark"+getRandomInt(1, 1)+".png";
        shape.width = 25;
        shape.height = 25;
    }

    shape.xspeed = shape.power * newXSpeed;
    shape.yspeed = shape.power * newYSpeed;

    shape.rotation = Math.random() * 360;
    shape.rotationAmount = getRandomInt(4, -4);

    shape.control = function () {

        if (0 > shape.y) {
            shape.y = 0
            shape.yspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (container.clientHeight < (shape.y + shape.height)) {
            shape.y = container.clientHeight - shape.height;
            shape.yspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (container.clientWidth < (shape.x + shape.width)) {
            shape.x = container.clientWidth - shape.width;
            shape.xspeed *= -1;
            shape.rotationAmount *= -1;
        }
        if (0 > shape.x) {
            shape.x = 0
            shape.xspeed *= -1;
            shape.rotationAmount *= -1;
        }

        if(shape.rotation + shape.rotationAmount > 360){
            shape.rotation -= 360;
        }else if(shape.rotation + shape.rotationAmount < 0){
            shape.rotation += 360;
        }else{
            shape.rotation += shape.rotationAmount;
        }

        shape.xspeed *= shape.friction;
        shape.yspeed *= shape.friction;

        shape.x += shape.xspeed;
        shape.y += shape.yspeed;
    };

    return shape;
};