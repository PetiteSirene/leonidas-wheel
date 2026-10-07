const prizes = [
    ["5% de réduction","#ef4444"],
    ["10% de réduction","#f59e0b"],
    ["15% de réduction","#10b981"],
    ["20% de réduction","#3b82f6"],
    ["Un chocolat offert","#8b5cf6"],
    ["Bon d'achat 30€","#ec4899"]
];


const wheel = document.getElementById("wheel");
const button = document.getElementById("spinButton");
const result = document.getElementById("result");

const sectorAngle = 360 / prizes.length;
let currentRotation = 0;
let isSpinning = false;

function buildWheel() {
  const gradient = prizes
    .map((prize, index) => {
      const start = index * sectorAngle;
      const end = (index + 1) * sectorAngle;
      return `${prize[1]} ${start}deg ${end}deg`;
    })
    .join(", ");

  wheel.style.background = `conic-gradient(${gradient})`;

  wheel.innerHTML = "";

  prizes.forEach((prize, index) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = prize[0];

    const angle = index * sectorAngle + sectorAngle / 2;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-145px)`;

    wheel.appendChild(label);
  });
}

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  button.disabled = true;
  result.textContent = "La roue tourne...";

  const winningIndex = Math.floor(Math.random() * prizes.length);
  const selectedCenterAngle = winningIndex * sectorAngle + sectorAngle / 2;
  const normalizedRotation = ((currentRotation % 360) + 360) % 360;

  const delta = (360 - selectedCenterAngle - normalizedRotation + 360) % 360;
  const fullSpins = 7 * 360;

  currentRotation += fullSpins + delta;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  window.setTimeout(() => {
    const winningPrize = prizes[winningIndex];
    result.textContent = `Gagné : ${winningPrize}`;
    isSpinning = false;
    button.disabled = false;
  }, 5000);
}

button.addEventListener("click", spinWheel);

buildWheel();