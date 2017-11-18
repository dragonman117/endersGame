let Unit = function(spec){
    let that = {},
        speed = spec.speed,
        damage = spec.damage,
        base = Base({
        x: spec.position.x,
        y: spec.position.y,
        health: spec.health
    });

    that.move = function(){
        base.move(speed);
    }



    return that;
}