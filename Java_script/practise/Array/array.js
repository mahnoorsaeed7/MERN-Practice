const world = {
    agents: [
        { name: "Aira", energy: 80 },
        { name: "Kael", energy: 40 }
    ]
};

const backup = { ...world };

backup.agents[0].energy = 0;

console.log(world.agents[0].energy); // 80 not rather 0 but why??
console.log(backup.agents[0].energy); // 0
console.log(world === backup); // false
console.log(world.agents === backup.agents); // true
//-----------------------------------------------------------------------------

const agents = [ 
    { name: "A", energy: 50 },
    { name: "B", energy: 80 }
];
 // map or gives the name of the agent whose enerfy is increased 
const result = agents.map(agent => ({
  ...agent,
  energy: agent.energy + 10
}));
//agent.energy += 10 changes the data. 

console.log(result);
console.log(agents); //  map  mutaste it 


// const agents = [
//     {
//         name: "Aira",
//         active: true,
//         energy: 80,
//         memories: 12
//     },
//     {
//         name: "Kael",
//         active: true,
//         energy: 20,
//         memories: 4
//     },
//     {
//         name: "Mira",
//         active: false,
//         energy: 100,
//         memories: 30
//     },
//     {
//         name: "Ren",
//         active: true,
//         energy: 70,
//         memories: 2
//     }
// ];
const prepareAgents = agents => {
    return agents
        .filter(agent => agent.active)
        .map(agent => ({
            ...agent,
            energy: agent.energy + 10
            
}));
};

const prepare = prepareAgents(agents);
console.log(prepare);
console.log(agents); // orignal was changing
