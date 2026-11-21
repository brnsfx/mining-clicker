// Andrieiev Volodymyr - Person 2
// The shop, better pickaxes and automatic miners.

let pickaxeLevel = 0;
let pickaxePrice = 10;
let minerCount = 0;
let minerPrice = 50;

const pickaxeButton = document.getElementById("buy-pickaxe");
const minerButton = document.getElementById("buy-miner");

// Buy an upgrade if the player has enough gold.
function buyPickaxe() {
  if (gold >= pickaxePrice) {
    gold -= pickaxePrice;
    goldPerClick++;
    pickaxeLevel++;
    upgradesBought++;

    // Every new upgrade costs a little more.
    pickaxePrice = 10 + pickaxeLevel * 15;

    updateDisplay();
    updateShop();
    updateStats();
    saveGame();
  }
}

function buyMiner() {
  if (gold >= minerPrice) {
    gold -= minerPrice;
    minerCount++;
    upgradesBought++;

    minerPrice = 50 + minerCount * 50;

    updateDisplay();
    updateShop();
    updateStats();
    saveGame();
  }
}

function updateShop() {
  document.getElementById("pickaxe-level").textContent = pickaxeLevel;
  document.getElementById("pickaxe-price").textContent = pickaxePrice;
  document.getElementById("miner-count").textContent = minerCount;
  document.getElementById("miner-price").textContent = minerPrice;

  // Buttons are disabled when we do not have enough gold.
  pickaxeButton.disabled = gold < pickaxePrice;
  minerButton.disabled = gold < minerPrice;
}

// This function runs once every second.
function automaticMining() {
  if (minerCount > 0) {
    gold += minerCount;
    totalGoldMined += minerCount;

    updateDisplay();
    updateShop();
    updateStats();
    saveGame();
  }
}

pickaxeButton.addEventListener("click", buyPickaxe);
minerButton.addEventListener("click", buyMiner);
setInterval(automaticMining, 1000);
