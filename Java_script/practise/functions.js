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

const calculateDamage = (heal, damage) => {
    return heal - damage ;
};

character.health = calculateDamage(character.health, 30);
console.log(character.health);