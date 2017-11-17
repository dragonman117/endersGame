let Base = function(){
    let that = {},
        position = { x:0, y:0},
        sprite;

    that.move = function(){}
    that.reportPosition = function(){ return position; }
    that.draw = function(){}
    that.face = function(){}

    return that;
}
