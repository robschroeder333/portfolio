const timespan = 1; //one cycle per day

const maxFood = 100;
const maxWater = 100;
const maxRest = 100;
const maxHappiness = 100;
const needsThreshold = 50;

class Creature {
  constructor(name, location, food, water, rest, happiness) {
    this.name = name;
    this.location = location;

    this.food = maxFood;
    this.foodRate = food;

    this.water = maxWater;
    this.waterRate = water;

    this.rest = maxRest;
    this.restRate = rest;

    this.happiness = maxHappiness / 2;
    this.happinessRate = happiness;
  }
  prioritizeNeeds() {
    const needsArray = [this.food, this.water, this.rest, this.happiness]
    let highestIndex = 0;
    let priority = null;

    if (needsArray[0] > needsThreshold
      && needsArray[1] > needsThreshold
      && needsArray[2] > needsThreshold
    ) {
      for (let i = 1; i < needsArray.length; i++) {
        if (needsArray[highestIndex] < needsArray[i]) {
          highestIndex = i;
        }
      }
    } else {
      for (let i = 1; i < needsArray.length - 1; i++) {
        if (needsArray[highestIndex] < needsArray[i]) {
          highestIndex = i;
        }
      }
    }

    switch (highestIndex) {
      case 0:
        priority = 'food';
        break;
      case 1:
        priority = 'water';
        break;
      case 2:
        priority = 'rest';
        break;
      case 3:
        priority = 'happiness';
        break;
      default:
        priority = 'water';
        break;
    }

    return priority;
  }

  consume(item) {
    this.food += item.foodValue;
    this.water += item.waterValue;
  }

  rest() {

  }

  travel() {

  }
}

class Human extends Creature {
  constructor(
    money,
    possessions = {},
    name = 'Hue Man',
    location = [0, 1],
    food = 15 / timespan,
    water = 30 / timespan,
    rest = 25 / timespan,
    happiness = 4 / timespan
  ) {
    super(name, food, water, rest, happiness);
    this.money = money;
    this.inventory = possessions;
  }
}

class Item {
  constructor(name){
    this.name = name;
  }
}

class Consumable extends Item {
  constructor(name, foodValue, waterValue) {
    super(name);
    this.foodValue = foodValue;
    this.waterValue = waterValue;
  }
}

const world = [
  [
    {
      name: 'market',
      actions: {
        //browse:
      }
    },
    {
      name: 'residences'
    },
    {
      name: 'woods'
    }
  ],
  [
    {
      name: 'smith'
    },
    {
      name: 'tavern'
    },
    {
      name: 'river'
    }
  ],
  [
    {
      name: 'mountain'
    },
    {
      name: 'cave'
    },
    {
      name: 'lake'
    }
  ]
]

