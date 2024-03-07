document.addEventListener('DOMContentLoaded', function () {
    const gameState = {
        gold: 100,
        wood: 50,
        food: 100,
        stone: 0,
        ore: 0,
        researchPoints: 0,
        populationTotal: 1, // Start with an initial population
        populationAvailable: 1,
        farmers: 0,
        miners: 0,
        farms: 0,
        mines: 0,
        environmentHealth: 100,
    };

    function updateResources() {
        gameState.food += gameState.farmers * 0.5; // Each farmer produces 0.5 food per tick
        gameState.ore += gameState.miners * 0.4; // Each miner produces 0.4 ore per tick
        gameState.environmentHealth -= (gameState.farms + gameState.mines) * 0.05; 
        if (gameState.environmentHealth < 0) gameState.environmentHealth = 0;

        // Automatic population generation logic
        if (gameState.food > 100) { // If food is more than 100, simulate natural population growth
            gameState.populationTotal += 0.05; // Increment population total slightly
            gameState.populationAvailable += 0.05; // Increment available population
            gameState.food -= 2; // Consume food for population growth
        }

        updateUI();
    }

    function formatNumber(number) {
        // Compact number formatting for better readability
        return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(Math.floor(number));
    }

    function updateUI() {
        // Update UI with formatted numbers
        Object.keys(gameState).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = formatNumber(gameState[key]);
            }
        });
    }

    function assignJob(jobType) {
        if (gameState.populationAvailable >= 1) {
            gameState[jobType]++;
            gameState.populationAvailable--;
            updateResources();
        } else {
            alert("No available population to assign.");
        }
    }

    function buildBuilding(buildingType, cost) {
        const canAfford = Object.keys(cost).every(resource => gameState[resource] >= cost[resource]);
        if (canAfford) {
            Object.keys(cost).forEach(resource => {
                gameState[resource] -= cost[resource];
            });
            gameState[buildingType]++;
            updateResources();
        } else {
            alert(`Cannot afford to build ${buildingType}.`);
        }
    }

    function buyHuman() {
        const humanCost = 50; // Cost of buying a human in terms of food
        if (gameState.food >= humanCost) {
            gameState.food -= humanCost;
            gameState.populationTotal += 1;
            gameState.populationAvailable += 1;
            updateResources();
        } else {
            alert("Not enough food to buy a human.");
        }
    }

    // Adding event listeners for buttons
    document.getElementById("addFarmer").addEventListener("click", () => assignJob('farmers'));
    document.getElementById("addMiner").addEventListener("click", () => assignJob('miners'));
    document.getElementById("buildFarm").addEventListener("click", () => buildBuilding('farms', { gold: 100, wood: 50 }));
    document.getElementById("buildMine").addEventListener("click", () => buildBuilding('mines', { gold: 150, wood: 100 }));
    document.getElementById("buyHuman").addEventListener("click", buyHuman);

    // Set an interval to update resources periodically
    setInterval(updateResources, 1000); // Adjust the interval as needed

    // Initial UI update
    updateUI();
});
