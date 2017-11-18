import { Graphics } from "/js/game/graphics.js"

let Base = function(spec){
    let that = {},
        position = spec.position,
        direction = spec.direction,
        sprite = Graphics.genSprite(spec.name),
        lastAttack = 0,
        target = null,
        dead = false;

    that.move = function(speed){
        position.x += direction.x * speed;
        position.y += direction.y * speed;
    }

    that.update = function(elapsedTime, speed){
        that.move(speed);
        lastAttack += elapsedTime;
        if(lastAttack > spec.attackSpeed && target !== null) that.attack();
        sprite.updatePosition(position.x, position.y)
        sprite.rotate(setRotation(direction));
    }

    that.takeHit = function(damage, effects){
        spec.health -= damage;
        if (spec.health < 0) dead = true;
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
        sprite.updatePosition(position.x, position.y);
        sprite.rotate(setRotation(direction));
    }

    that.init = function(){
        sprite.init(position.x, position.y, setRotation(direction));
    }

    that.isDead = function(){ return dead; }

    return that;
}

function normalize(vec){
    let length = Math.sqrt(vec.x*vec.x + vec.y*vec.y)
    return {
        x: vec.x / length,
        y: vec.y / length
    }
}

function setRotation(direction){
    if(direction.y === 0){
        if(direction.x > 0) return -Math.PI / 2;
        else return Math.PI / 2;
    }
    let rads = Math.atan(direction.x/direction.y);
    if(direction.y < 0) rads += Math.PI;
    rads = Math.PI * 2 - rads;
    return rads;
}

export { Base };