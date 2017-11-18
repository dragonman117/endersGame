let Cell = function(){
    let that = {},
    position = { row:0, col:0 },
    occupied = null;

    that.init = function(row,col){ position.row = row; position.col = col; }

    that.getPosition = function(){ return position; }

    return that;
}