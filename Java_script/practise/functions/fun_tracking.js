    const character = {
        name: "Dokja",
        health: 100
    };

    // method A
    const damage = (character, amount) => {
        character.health -= amount;
        return character;
    };

    // method B
    const damageB = (character, amount) => {
        return {
            ...character, // spread operator creates a new object. But creates a shallow copy.
            health: character.health - amount
        };
    };
    const damaged = damageB(character, 30);
    console.log(character.health);
    console.log(damaged.health);
    console.log(character === damaged);

//----------------------------------------------

const result = agents
.filter(agent => agent.energy >= 50)
.map(agent => agent.name);

//----------------------------------------------

const agents = [
    { name: "Aira", energy: 80, active: true },
    { name: "Kael", energy: 20, active: true },
    { name: "Mira", energy: 100, active: false },
    { name: "Ren", energy: 65, active: true }
];

// no its not with energy 20 not meat req but its active but if being ready means they need to have enery more than  50 then its 3rd that is in active despite being full
// 2nd
// e.active AND
const ready = agents.filter(
    agent => agent.energy >= 50 && agent.active
);
//----------------------------------------------
const memories = [
    { text: "Tea", important: false },
    { text: "User name", important: true },
    { text: "Project goal", important: true },
    { text: "Weather", important: false }
];
// find is userd insted of filter only first one will be selected
const memory = memories.filter(m => m.important);
console.log(memory);

//----------------------------------------------
const agents = [
  { name: "A", active: true },
  { name: "B", active: false },
  { name: "C", active: true },
];

const result = agents.map((agent) => agent.name);
console.log(result);
// it caused the new array to store ture and false instead if agens name . wrong mapping and only one thing in return unlike filter
agents.filter((agent) => agent.active);
// this filer out all with status active aling with the name both\
//--------------------------------------------------
const agentss = [
    { name: "A", energy: 80 },
    { name: "B", energy: 40 },
    { name: "C", energy: 60 }
];

const results = agentss
    .filter(agent => agent.energy >= 50)
    .map(agent => agent.energy)
    .find(energy => energy > 70);

console.log(results);
// agents
//  ↓
// filters enrgy 
//  ↓
// then map who by filter 
//  ↓
// and then amoung them find greater than 70
//  ↓
// result
