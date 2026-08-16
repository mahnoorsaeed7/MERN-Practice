const characters = [
    { name: "Dokja", health: 80, alive: true },
    { name: "Yoo Joonghyuk", health: 20, alive: true },
    { name: "Sangah", health: 0, alive: false },
    { name: "Hyunsung", health: 60, alive: true }
];
const character = {
    name: "Dokja",
    health: 100
};

const calculateDamage = (health, damage) => {
    return health - damage;
};

character.health = calculateDamage(character.health, 30);
console.log(character.health);

const getAliveCharacters = (char) => {
    return char.filter( element => element.alive);
};

const alivechar = getAliveCharacters(characters)
console.log(alivechar);

//----------------------------------------------------------
const calculateDamage = (health, damage) => {
    health - damage; // no return 
};

const result = calculateDamage(100, 30);

console.log(result);