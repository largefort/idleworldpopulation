
// Initialize game state variables
let gold = 0, food = 50, ore = 0, population = 0, farmers = 0, miners = 0;

// Load game state from localStorage
const loadGame = () => {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        gold = gameData.gold;
        food = gameData.food;
        ore = gameData.ore;
        population = gameData.population;
        farmers = gameData.farmers;
        miners = gameData.miners;
    }
};

// Save game state to localStorage
const saveGame = () => {
    const gameData = { gold, food, ore, population, farmers, miners };
    localStorage.setItem('gameData', JSON.stringify(gameData));
};

// Display messages to the user for actions
const displayMessage = (message) => {
    // Implement UI feedback mechanism here
    // For simplicity, using alert, but you should replace this with a non-blocking UI element
    alert(message);
};

// Update all UI elements
const updateUI = () => {
    document.getElementById('goldCount').textContent = gold;
    document.getElementById('foodCount').textContent = food;
    document.getElementById('oreCount').textContent = ore;
    document.getElementById('populationCount').textContent = population;
    document.getElementById('farmerCount').textContent = farmers;
    document.getElementById('minerCount').textContent = miners;
};

// Assign listeners and implement game logic
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    updateUI();

    document.getElementById('buyPerson').addEventListener('click', () => {
        const personCost = 10;
        if (food >= personCost) {
            food -= personCost;
            population += 1;
            saveGame();
            updateUI();
            displayMessage("Person bought!");
        } else {
            displayMessage("Not enough food!");
        }
    });

    document.getElementById('assignFarmer').addEventListener('click', () => {
        if (population > 0) {
            population -= 1;
            farmers += 1;
            saveGame();
            updateUI();
            displayMessage("Farmer assigned!");
        } else {
            displayMessage("No available population to assign!");
        }
    });

    document.getElementById('assignMiner').addEventListener('click', () => {
        if (population > 0) {
            population -= 1;
            miners += 1;
            saveGame();
            updateUI();
            displayMessage("Miner assigned!");
        } else {
            displayMessage("No available population to assign!");
        }
    });

    document.getElementById('buyOre').addEventListener('click', () => {
        const oreCost = 20;
        if (gold >= oreCost) {
            gold -= oreCost;
            ore += 1;
            saveGame();
            updateUI();
            displayMessage("Ore purchased!");
        } else {
            displayMessage("Not enough gold!");
        }
    });

    // Resource collection logic
    const collectResources = () => {
        // Example: gain 1 gold per miner, and 2 food per farmer per interval
        gold += miners;
        food += farmers * 2;
        saveGame();
        updateUI();
    };

    // Collect resources every second (1000 milliseconds)
    setInterval(collectResources, 1000);
});
