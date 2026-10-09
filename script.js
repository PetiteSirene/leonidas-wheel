const prizes = [
    ["5% de réduction","#0F2458"],
    ["10% de réduction","#E6C033"],
    ["5% de réduction","#0F2458"],
    ["15% de réduction","#ff0b0b"],
    ["5% de réduction","#0F2458"],
    ["10% de réduction","#E6C033"],
    ["Un chocolat offert","#616162"],
];


const wheel = document.getElementById("wheel");
const button = document.getElementById("spinButton");
const winModal = document.getElementById("winModal");
const winPrize = document.getElementById("winPrize");

const sectorAngle = 360 / prizes.length;
let currentRotation = 0;
let isSpinning = false;

function buildWheel() {
  showWinModal("5% de réduction"); // Hide the modal when building the wheel
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
    const topOffset = wheel.clientWidth * 0.15;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-145px) translateY(-${topOffset}px)`;

    wheel.appendChild(label);
  });
}

function showWinModal(prize) {
  winPrize.textContent = prize;
  winModal.classList.add("visible");
}

function hideWinModal() {
  winModal.classList.remove("visible");
}

function spinWheel() {
  if (isSpinning) return;

  hideWinModal();
  isSpinning = true;
  button.disabled = true;

  const winningIndex = Math.floor(Math.random() * prizes.length);
  const selectedCenterAngle = winningIndex * sectorAngle + sectorAngle / 2;
  const normalizedRotation = ((currentRotation % 360) + 360) % 360;

  const delta = (360 - selectedCenterAngle - normalizedRotation + 360) % 360;
  const fullSpins = 7 * 360;

  currentRotation += fullSpins + delta;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  window.setTimeout(() => {
    const winningPrize = prizes[winningIndex][0];
    showWinModal(winningPrize);
    isSpinning = false;
    button.disabled = false;
  }, 5000);
}

button.addEventListener("click", spinWheel);
winModal.addEventListener("click", hideWinModal);

buildWheel();