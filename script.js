// Mining Clicker - script.js
// Bernardo Viaro: rock clicking, gold counter and click animation.
// Small changes were added here to connect the shop and statistics.

let gold = 0;
let goldPerClick = 1;
const SAVE_KEY = "miningClickerSave";

const rock = document.getElementById("rock");
const goldAmountEl = document.getElementById("gold-amount");
const goldPerClickEl = document.getElementById("gold-per-click");
const floatingTextsEl = document.getElementById("floating-texts");

function mineRock(event) {
  gold += goldPerClick;

  // Petrenko Andii: these numbers are used in the statistics.
  totalGoldMined += goldPerClick;
  totalClicks++;

  updateDisplay();
  playClickAnimation();
  showFloatingText(event);

  // Refresh the other parts after mining.
  updateShop();
  updateStats();
  saveGame();
}

function updateDisplay() {
  goldAmountEl.textContent = gold;
  goldPerClickEl.textContent = goldPerClick;
}

function playClickAnimation() {
  rock.classList.remove("hit");
  void rock.offsetWidth;
  rock.classList.add("hit");
}

function showFloatingText(event) {
  const text = document.createElement("div");
  text.className = "floating-text";
  text.textContent = "+" + goldPerClick;
  const areaRect = floatingTextsEl.getBoundingClientRect();
  text.style.left = (event.clientX - areaRect.left - 10) + "px";
  text.style.top = (event.clientY - areaRect.top - 30) + "px";
  floatingTextsEl.appendChild(text);
  setTimeout(function () {
    text.remove();
  }, 900);
}

rock.addEventListener("click", mineRock);
// Loading the saved game is done at the bottom of save.js.
