let MovementEffects = {
    slow: function(mod){
        return mod * .66;
    },
    frozen: function(mod){
        return 0;
    },
    fast: function(mod){
        return mod * 1.5;
    },
    burning: function(mod){
        return mod * 1.25;
    },
    notMoving: function(mod){
        return 0;
    }
}

let AttackEffects = {
    crit: function(mod, effect){
        return mod * Math.random() < effect.chance ? effect.amount : 1;
    }
}

export { MovementEffects }