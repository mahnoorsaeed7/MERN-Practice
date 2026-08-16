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
// const calculateDamage = (health, damage) => {
//    return health - damage; // no return 
// };

// const result = calculateDamage(100, 30);

// console.log(result);

//----------------------------------------------------------
const agents = [
    {
        name: "Aira",
        active: true,
        energy: 80,
        memories: 12
    },
    {
        name: "Kael",
        active: true,
        energy: 20,
        memories: 4
    },
    {
        name: "Mira",
        active: false,
        energy: 100,
        memories: 30
    },
    {
        name: "Ren",
        active: true,
        energy: 70,
        memories: 2
    }
];
const getSchedulableAgents = (agents) => {
    return agents.filter(agent => agent.active && agent.energy > 50 && agent.memories >5)
}

const readyag = getSchedulableAgents(agents);
console.log (readyag);

//----------------------------------------------------------
