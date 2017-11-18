let Base = function(spec){
    let that = {},
        position = spec.position,
        direction = spec.direction,
        sprite = spec.name,
        lastAttack = 0,
        target = null;

    that.move = function(speed){
        position.x += direction.x * speed;
        position.y += direction.y * speed;
    }

    that.update = function(elapsedTime, speed){
        that.move(speed);
        lastAttack += elapsedTime;
        if(lastAttack > spec.attackSpeed && target !== null) that.attack();
    }

    that.takeHit = function(damage, effects){

    }

    that.changeDirection = function(lookAt){
        direction = {
            x: lookAt.x - position.x,
            y: lookAt.y - position.y
        }
        direction = normalize(direction);
    }

    that.setTarget = function(unit){
        target = unit;
    }

    that.attack = function(){
        if(target.takeHit(spec.damage, spec.effects) === "dead") target = null;
    }

    that.reportPosition = function(){ return position; }

    that.draw = function(){
        // graphics.drawSprite(sprite, position, direction);
        sprite.draw();
    }


    return that;
}

function normalize(vec){
    let length = Math.sqrt(vec.x*vec.x + vec.y*vec.y)
    return {
        x: vec.x / length,
        y: vec.y / length
    }
}