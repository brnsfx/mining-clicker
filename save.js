// Petrenko Andii - Person 3
// Saving the game, showing statistics and resetting progress.

let totalGoldMined = 0;
let totalClicks = 0;
let upgradesBought = 0;

function saveGame() {
  // We save the main game numbers in one object.
  const data = {
    gold: gold,
    goldPerClick: goldPerClick,
    pickaxeLevel: pickaxeLevel,
    pickaxePrice: pickaxePrice,
    minerCount: minerCount,
    minerPrice: minerPrice,
    totalGoldMined: totalGoldMined,
    totalClicks: totalClicks,
    upgradesBought: upgradesBought
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);

  if (saved !== null) {
    const data = JSON.parse(saved);

    // If a number was not saved before, use its starting value.
    gold = data.gold || 0;
    goldPerClick = data.goldPerClick || 1;
    pickaxeLevel = data.pickaxeLevel || 0;
    pickaxePrice = data.pickaxePrice || 10;
    minerCount = data.minerCount || 0;
    minerPrice = data.minerPrice || 50;
    totalGoldMined = data.totalGoldMined || 0;
    totalClicks = data.totalClicks || 0;
    upgradesBought = data.upgradesBought || 0;
  }
}

function updateStats() {
  document.getElementById("total-mined").textContent = totalGoldMined;
  document.getElementById("total-clicks").textContent = totalClicks;
  document.getElementById("upgrades-bought").textContent = upgradesBought;
  document.getElementById("gold-per-second").textContent = minerCount;
}

function resetGame() {
  // Ask before deleting the progress.
  if (confirm("Do you want to start a new game?")) {
    gold = 0;
    goldPerClick = 1;
    pickaxeLevel = 0;
    pickaxePrice = 10;
    minerCount = 0;
    minerPrice = 50;
    totalGoldMined = 0;
    totalClicks = 0;
    upgradesBought = 0;

    localStorage.removeItem(SAVE_KEY);
    updateDisplay();
    updateShop();
    updateStats();
  }
}

document.getElementById("reset-game").addEventListener("click", resetGame);

// Start the page with the saved progress (if there is any).
loadGame();
updateDisplay();
updateShop();
updateStats();
