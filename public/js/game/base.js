let Base = function(spec){
    let that = {},
        position = { x:spec.x, y:spec.y },
        sprite;

    that.move = function(){}
    that.reportPosition = function(){ return position; }
    that.draw = function(){}
    that.face = function(){}


    return that;
}
