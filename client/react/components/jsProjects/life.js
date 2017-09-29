const cyclesPerDay = 3;
let cycleCounter = 1;
let dayCounter = 1;

const maxFood = 100;
const maxWater = 100;
const maxRest = 100;
const maxHappiness = 100;
const needsThreshold = 70;

const displayQueue = [];
const queueLength = 10;

// Utils
////

// TODO: refactor map structure (matrix -> graph)
const changeLocation = (current, change) => {
  const newLocation = [];
  newLocation.push(current[0] + change[0]);
  newLocation.push(current[1] + change[1]);
  return newLocation;
};

const updateLog = () => {
  const log = document.getElementById('log');
  const formattedQueue = displayQueue.map(ele => `<li>${ele}</li>`).join('');
  log.innerHTML = formattedQueue;
};

const addToQueue = string => {
  while (displayQueue.length >= queueLength) {
    displayQueue.shift();
  }
  displayQueue.push(string);
  updateLog();
};

// Classes
////
class Creature {
  constructor(name, location, invLimit = 1, food, water, rest, happiness, inventory = []) {
    this.name = name;
    this.location = location;
    this.inventory = inventory;
    this.invLimit = invLimit;

    this.food = maxFood;
    this.foodRate = food / cyclesPerDay;

    this.water = maxWater;
    this.waterRate = water / cyclesPerDay;

    this.rest = maxRest;
    this.restRate = rest / cyclesPerDay;

    this.happiness = maxHappiness;
    this.happinessRate = happiness / cyclesPerDay;

    this.isAlive = true;
  }

  prioritizeNeeds() {
    const needsArray = [this.food, this.water, this.rest, this.happiness];
    let highestIndex = 0;


    // if all needs are met
    if (needsArray[0] > needsThreshold
      && needsArray[1] > needsThreshold
      && needsArray[2] > needsThreshold
      && needsArray[3] > needsThreshold
    ) {
      highestIndex = -1;

      // if basic needs are met (all but happiness)
    } else if (needsArray[0] > needsThreshold
      && needsArray[1] > needsThreshold
      && needsArray[2] > needsThreshold
    ) {
      for (let i = 1; i < needsArray.length; i++) {
        if (needsArray[highestIndex] > needsArray[i]) {
          highestIndex = i;
        }
      }

      // if not all basic needs are met
    } else {
      for (let i = 1; i < needsArray.length - 1; i++) {
        if (needsArray[highestIndex] > needsArray[i]) {
          highestIndex = i;
        }
      }
    }

    switch (highestIndex) {
      case 0:
        this.tryToEat();
        break;
      case 1:
        this.tryToDrink();
        break;
      case 2:
        this.takeNap();
        break;
      case 3:
        this.travel();
      break;
      default:
        this.prepare();
        break;
    }

  }

  prepare() {
    // forage, store supplies in home, etc
  }

  tryToEat() {
    const here = world[this.location[0]][this.location[1]];
    if (here.actions.eat !== undefined) {
      this.eat(here.actions.eat, here);
    } else if (this.inventory.length > 0) {
      // check for food in inventory
    } else {
      this.travel();
    }
  }

  tryToDrink() {
    const here = world[this.location[0]][this.location[1]];
    if (here.actions.drink !== undefined) {
      this.drink(here.actions.drink, here);
    } else if (this.inventory.length > 0) {
      // check for drink in inventory
    } else {
      this.travel();
    }
  }


  updateNeeds() {
    this.food = +((this.food - this.foodRate).toFixed(2));
    this.water = +((this.water - this.waterRate).toFixed(2));
    this.rest = +((this.rest - this.restRate).toFixed(2));
    this.happiness = +((this.happiness - this.happinessRate).toFixed(2));

    // for testing
    // console.log(`${this.name}== food=${this.food} water=${this.water} rest=${this.rest} happiness=${this.happiness}`);

    if (this.food < 0 || this.water < 0 || this.rest < 0) {
      this.isAlive = false;
      addToQueue(`${this.name} has perished.`);
    }
  }

  // Actions
  ////
  forage(location, foodOrDrinkBool) {

    if (inventory.length < invLimit) {
    // search based on bool
    }
  }

  eat(item, location) {
    this.food = Math.min(this.food + item.foodValue, maxFood);
    addToQueue(`${this.name} ate some ${item.name} from the ${location.name}.`);
  }

  drink(item, location) {
    this.water = Math.min(this.water + item.waterValue, maxWater);
    addToQueue(`${this.name} drank some ${item.name} from the ${location.name}.`);
  }

  takeNap() {
    const here = world[this.location[0]][this.location[1]];
    this.rest = Math.min(this.rest + 70, maxRest);
    addToQueue(`${this.name} took a nap near the ${here.name}.`);
  }

  travel() {

    //TODO: refactor to work with map refactor (matrix -> graph)

    const direction = Math.floor(Math.random() * (4 - 0) + 0);
    let newLoc = null;
    switch (direction) {
      case 0: //Up
        newLoc = changeLocation(this.location, [0,1]);
        if (world[newLoc[0]][newLoc[1]] !== undefined) {
          this.location = newLoc;
          this.happiness = Math.min(this.happiness + 20, maxHappiness);
          addToQueue(`${this.name} moved to the ${world[this.location[0]][this.location[1]].name}`);
        } else {
          this.travel();
        }
        break;
      case 1: //Right
        newLoc = changeLocation(this.location, [1,0]);
        if (world[newLoc[0]][newLoc[1]] !== undefined) {
          this.location = newLoc;
          this.happiness = Math.min(this.happiness + 20, maxHappiness);
          addToQueue(`${this.name} moved to the ${world[this.location[0]][this.location[1]].name}`);
        } else {
          this.travel();
        }
        break;
      case 2: //Down
        newLoc = changeLocation(this.location, [0,-1]);
        if (world[newLoc[0]][newLoc[1]] !== undefined) {
          this.location = newLoc;
          this.happiness = Math.min(this.happiness + 20, maxHappiness);
          addToQueue(`${this.name} moved to the ${world[this.location[0]][this.location[1]].name}`);
        } else {
          this.travel();
        }
        break;
      case 3: //Left
        newLoc = changeLocation(this.location, [-1,0]);
        if (world[newLoc[0]][newLoc[1]] !== undefined) {
          this.location = newLoc;
          this.happiness = Math.min(this.happiness + 20, maxHappiness);
          addToQueue(`${this.name} moved to the ${world[this.location[0]][this.location[1]].name}`);
        } else {
          this.travel();
        }
        break;

      default:
        break;
    }
  }
}

class Human extends Creature {
  constructor(
    name = 'Hue Man',
    location = [0, 1],
    invLimit = 6,
    food = 15,
    water = 30,
    rest = 25,
    happiness = 6,
    inventory = [],
    money = 0
  ) {
    super(name, location, invLimit, food, water, rest, happiness, inventory);
    this.money = money;
  }
}

class Item {
  constructor(name) {
    this.name = name;
  }
}

class Consumable extends Item {
  constructor(name, foodValue, waterValue) {
    super(name);
    this.foodValue = foodValue;
    this.waterValue = waterValue;
  }
  isFood() {
    if (this.foodValue > 0 && this.foodValue > this.waterValue) {
      return true;
    }
    return false;
  }

  isDrink() {
    if (this.waterValue > 0 && this.waterValue > this.foodValue) {
      return true;
    }
    return false;
  }
}


// Instances
////
const freshWater = new Consumable('fresh water', 0, 70);
const stillWater = new Consumable('still water', 0, 50);
const dirtyWater = new Consumable('dirty water', 0, 20);

const berries = new Consumable('berries', 20, 0);
const mushrooms = new Consumable('mushrooms', 40, 0);
const crayfish = new Consumable('crayfish', 50, 0);
const trash = new Consumable('trash', 15, 0);

const testCreature1 = new Human('Bill', [0,1]);
const testCreature2 = new Creature('muskcrat', [0,0], 20, 35, 15, 10);

const arrayOfLife = [testCreature1, testCreature2];

// GameWorld
////
const world = [
  [
    {
      name: 'market',
      actions: {
        eat: trash,
        drink: dirtyWater
      },
      creatures: {

      }
    },
    {
      name: 'residences',
      actions: {
        eat: trash
      }
    },
    {
      name: 'woods',
      actions: {
        eat: berries,
        drink: stillWater
      }
    }
  ],
  [
    {
      name: 'smith',
      actions: {

      }
    },
    {
      name: 'tavern',
      actions: {
        eat: trash,
        drink: freshWater
      }
    },
    {
      name: 'river',
      actions: {
        eat: crayfish,
        drink: freshWater
      }
    }
  ],
  [
    {
      name: 'mountain',
      actions: {
        drink: dirtyWater
      }
    },
    {
      name: 'cave',
      actions: {
        eat: mushrooms
      }
    },
    {
      name: 'lake',
      actions: {
        drink: stillWater,
        eat: berries
      }
    }
  ]
];

// Game Loop
////
const gameLoop = () => {
  arrayOfLife.forEach(livingThing => {
    if (livingThing.isAlive) {
      livingThing.prioritizeNeeds();
      livingThing.updateNeeds();
    }
  });

  if (cycleCounter === cyclesPerDay) {
    cycleCounter = 1;
    addToQueue(`Day ${dayCounter} over...`);
    dayCounter++;
  } else {
    cycleCounter++;
  }
};
