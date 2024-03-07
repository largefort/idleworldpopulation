// Initial game state
let gameState = {
    gold: 100,
    wood: 50,
    food: 100,
    stone: 0,
    ore: 0,
    researchPoints: 0,
    populationTotal: 0,
    populationAvailable: 0,
    farmers: 0,
    miners: 0,
    farms: 0,
    mines: 0,
    environmentHealth: 100,
};

function updateResources() {
    // Example resource generation logic
    gameState.food += gameState.farmers; // Assume each farmer produces 1 food per tick
    gameState.ore += gameState.miners; // Assume each miner produces 1 ore per tick

    // Example of environmental impact
    gameState.environmentHealth -= (gameState.farms + gameState.mines) * 0.1; // Example degradation
    if (gameState.environmentHealth < 0) gameState.environmentHealth = 0;

    updateUI();
}

function updateUI() {
    for (const [key, value] of Object.entries(gameState)) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value.toFixed ? value.toFixed(2) : value;
        }
    }
}

// Assign jobs
function assignJob(jobType) {
    if (gameState.populationAvailable > 0) {
        gameState[jobType]++;
        gameState.populationAvailable--;
        updateUI();
    } else {
        console.log("No available population to assign");
    }
}

// Build buildings
function buildBuilding(buildingType, cost) {
    const canAfford = Object.entries(cost).every(([resource, amount]) => gameState[resource] >= amount);
    if (canAfford) {
        Object.entries(cost).forEach(([resource, amount]) => {
            gameState[resource] -= amount;
        });
        gameState[buildingType]++;
        gameState.environmentHealth -= 5; // Example environmental impact
        updateUI();
    } else {
        console.log("Cannot afford to build", buildingType);
    }
}

document.getElementById("addFarmer").addEventListener("click", () => assignJob('farmers'));
document.getElementById("addMiner").addEventListener("click", () => assignJob('miners'));
document.getElementById("buildFarm").addEventListener("click", () => buildBuilding('farms', { gold: 100, wood: 50 }));
document.getElementById("buildMine").addEventListener("click", () => buildBuilding('mines', { gold: 150, wood: 100 }));

setInterval(updateResources, 1000); // Update resources every second

updateUI(); // Initial UI update
