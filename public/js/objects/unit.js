import { MovementEffects } from "/js/objects/effects.js"
import {Base} from "/js/game/base.js"

// Spec object to initialize a unit
// {
//     speed:,
//     position:,
//     direction:,
//     health:,
//     damage:,
//     range:,
//     effects:,
//     attackSpeed:,
//     name:,
//     unitName:
// }

let Unit = function(spec){
    let that = {},
        speed = spec.speed,
        status = ["notMoving"],
        destination,
        base = Base({
            position: spec.position,
            direction: spec.direction,
            health: spec.health,
            damage: spec.damage,
            range: spec.range,
            effects: spec.effects,
            attackSpeed: spec.attackSpeed,
            name: spec.name,
            unitName: spec.unitName
    });

    that.update = function(elapsedTime){
        let modifier = 1;
        for(let i = 0; i < status.length; i++){
            if(MovementEffects.hasOwnProperty(status[i])){
                modifier = MovementEffects[status[i]](modifier);
            }
        }
        base.update(elapsedTime, speed * modifier);
        let curPos = base.reportPosition();
        if(status.indexOf("notMoving") < 0 && destination && posAreSame(curPos, destination)){
            status.push("notMoving");
            destination = null;
        }
    }

    that.setDestination = function(dest){
        destination = dest;
        for(let i = 0; i < status.length; i++){
            if(status[i] === "notMoving") status[i] = "moving";
        }
        that.changeDirection(dest);
    }

    that.changeDirection = function(lookAt){
        base.changeDirection(lookAt);
    }

    that.takeHit = function(damage, effects){
        base.takeHit(damage, effects);
    }

    that.init = function(){
        base.init();
    }

    that.isDead = function(){ return base.isDead(); }

    that.setName = function(name){ base.setName(name); }

    that.getName = function(){ return base.getName(); }

    return that;
};

function posAreSame(p1,p2){
    let distance = Math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2)
    return distance < 5;
};

export { Unit };