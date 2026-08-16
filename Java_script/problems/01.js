const numbers = [3, 7, 2, 9, 4, 10];

const findFirstLarge = (numbers) => {
    return numbers.find(e => e > 8);
};

let large = findFirstLarge(numbers);
console.log(large);

//----------------------------------------------------------

const agents = [
    { name: "Aira", energy: 80, active: true },
    { name: "Kael", energy: 20, active: true },
    { name: "Mira", energy: 0, active: false },
    { name: "Ren", energy: 65, active: true }
];

const getReadyAgents = (agents) => {
    return agents.filter(e => e.active && e.energy >= 50);
}

const readyage = getReadyAgents(agents);
console.log(readyage);

//----------------------------------------------------------

