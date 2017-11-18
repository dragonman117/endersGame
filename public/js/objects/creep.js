// Spec object to initialize a creep
// {
//     creep: {
//         speed:,
//         direction:,
//         health:,
//         damage:,
//         range:,
//         levelFactor:,
//         effects:,
//         attackSpeed:,
//     },
//     level:,
//     position:,
//     direction:
// }
import { Unit } from "/js/objects/unit.js"

let Creep = function(spec){
    let that = {},
        unit = Unit({
            damage: spec.creep.damage * spec.creep.levelFactor * spec.level,
            speed: spec.creep.speed,
            position: spec.position,
            health: spec.creep.health * spec.creep.levelFactor * spec.level,
            range: spec.creep.range,
            effects: spec.creep.effects,
            direction: spec.direction,
            attackSpeed: spec.creep.attackSpeed,
            name: spec.creep.name,
            unitName: "I'm a creep",
        });

    that.update = function(elapsedTime){
        // TODO: Creep AI here
        unit.update(elapsedTime);
    }

    that.setDestination = function(dest){
        unit.setDestination(dest);
    }

    that.changeDirection = function(lookAt){
        unit.changeDirection(lookAt);
    }

    that.draw = function(){
        unit.draw();
    }

    that.takeHit = function(damage, effects) {
        unit.takeHit(damage, effects);
    }

    that.init = function(){
        unit.init();
    }

    that.isDead = function(){ return unit.isDead(); }

    return that;
}

export { Creep };