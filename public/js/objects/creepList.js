let CreepList = {
  "example": {
    "speed": 5,
    "health": 100,
    "damage": 6,
    "range": 250,
    "attackSpeed": 1,
    "levelFactor": 1.2,
    "effects": {
      "slow": {
        "amount" : 0.66,
        "chance" : 0.1
      },
      "crit": {
        "amount" : 1.3,
        "chance" : 0.1
      }
    },
      "name": "creep.example"
  },
    "scout": {
        "speed": 5,
        "health": 100,
        "damage": 6,
        "range": 250,
        "attackSpeed": 1,
        "levelFactor": 1.1,
        "effects": {},
        "name": "creep.scout"
    }
};

export { CreepList };