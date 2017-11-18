let Battlefield = function(){
    let that = {},
    grid;

    that.init = function(){
        grid = [];
        for (let i = 0; i < 26; i++){
            grid.append([]);
            for (let j = 0; j < 26; j++){
                grid[i].append(Cell());
            }
        }
    }





    return that;
}