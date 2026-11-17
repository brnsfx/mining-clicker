// ============================================================
// Mining Clicker - script.js
// Person 1 (Bernardo Viaro): main game, rock click, gold counter,
//                            click animation, saving gold
// Person 2 (NAME): Upgrades / shop (can use goldPerClick and gold)
// Person 3 (NAME): Score board / extra features
// ============================================================
let gold = 0;
let goldPerClick = 1;
const SAVE_KEY = "miningClickerSave";
const rock = document.getElementById("rock");
const goldAmountEl = document.getElementById("gold-amount");
const goldPerClickEl = document.getElementById("gold-per-click");
const floatingTextsEl = document.getElementById("floating-texts");
function mineRock(event) {
  gold += goldPerClick;
  updateDisplay();
  playClickAnimation();
  showFloatingText(event);
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
function saveGame() {
  const data = { gold: gold, goldPerClick: goldPerClick };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}
function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (saved !== null) {
    const data = JSON.parse(saved);
    gold = data.gold || 0;
    goldPerClick = data.goldPerClick || 1;
  }
}
rock.addEventListener("click", mineRock);
loadGame();
updateDisplay();