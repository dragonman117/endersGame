let Model = function(){
    let that = {},
    graphics;

    that.init = function(g){ graphics = g; }

    that.gameOver = function(){ return false; }


    return that;
}

export { Model };