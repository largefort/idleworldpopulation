let gold = 0;
let food = 50; // Starting with some initial food
let ore = 0;
let population = 0;
let farmers = 0;
let miners = 0;

const updateUI = () => {
    document.getElementById('goldCount').textContent = gold;
    document.getElementById('foodCount').textContent = food;
    document.getElementById('oreCount').textContent = ore;
    document.getElementById('populationCount').textContent = population;
    document.getElementById('farmerCount').textContent = farmers;
    document.getElementById('minerCount').textContent = miners;
};

document.getElementById('buyPerson').addEventListener('click', () => {
    const personCost = 10;
    if (food >= personCost) {
        food -= personCost;
        population += 1;
        updateUI();
    } else {
        alert("Not enough food!");
    }
});

document.getElementById('assignFarmer').addEventListener('click', () => {
    if (population > 0) {
        population -= 1;
        farmers += 1;
        updateUI();
    } else {
        alert("No population to assign!");
    }
});

document.getElementById('assignMiner').addEventListener('click', () => {
    if (population > 0) {
        population -= 1;
        miners += 1;
        updateUI();
    } else {
        alert("No population to assign!");
    }
});

document.getElementById('buyOre').addEventListener('click', () => {
    const oreCost = 20;
    if (gold >= oreCost) {
        gold -= oreCost;
        ore += 1;
        updateUI();
    } else {
        alert("Not enough gold!");
    }
});

const collectResources = () => {
    // Simulate resource collection
    gold += miners; // Assume each miner generates 1 gold per tick
    food += farmers; // Assume each farmer generates 1 food per tick
    updateUI();
};

setInterval(collectResources, 1000); // Collect resources every second

updateUI(); // Initial UI update
