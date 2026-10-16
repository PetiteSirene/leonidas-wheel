//Liste des prix à gagner
//[titre \n sous titre, couleur, taille du titre, taille du sous-titre]
const prizes = [
    ["5%\nde réduction", "#0F2458", "3rem", "1.2rem"],
    ["15%\nde réduction", "#ff0b0b", "3rem", "1.2rem"],
    ["5%\nde réduction", "#0F2458", "3rem", "1.2rem"],
    ["10%\nde réduction", "#E6C033", "3rem", "1.2rem"],
    ["5%\nde réduction", "#0F2458", "3rem", "1.2rem"],
    ["10%\nde réduction", "#E6C033", "3rem", "1.2rem"],
    ["Un chocolat offert", "#616162", "2rem", ""],
];

//Récupérer les éléments qui nous interesse dans l'html
const wheel = document.getElementById("wheel");
const button = document.getElementById("spinButton");
const winModal = document.getElementById("winModal");
const winPrize = document.getElementById("winPrize");

let sectorAngle = 0;
let currentRotation = 0;
let isSpinning = false;

function buildWheel() {
  //Calculer l'angle d'un quartier de roue en fonction du nombre de prix
  sectorAngle = 360 / prizes.length;

  //Colorier la roue en quartier
  const gradient = prizes
    .map((prize, index) => {
      const start = index * sectorAngle;
      const end = (index + 1) * sectorAngle;
      return `${prize[1]} ${start}deg ${end}deg`;
    })
    .join(", ");
  wheel.style.background = `conic-gradient(${gradient})`;
  wheel.innerHTML = "";

  //Pour chaque prix
  prizes.forEach((prize, index) => {
    
    //créer un label composé d'un titre et d'un sous-titre
    const label = document.createElement("div");
    label.className = "label";
    label.style.display = "flex";
    label.style.flexDirection = "column";
    label.style.alignItems = "center";
    label.style.justifyContent = "center";
    label.style.gap = "2px";

    const [firstLine, secondLine = ""] = prize[0].split("\n");
    const normalizedFirstLine = firstLine.trim().toLowerCase();

    if (normalizedFirstLine === "un chocolat offert" || normalizedFirstLine === "un choco offert") {
      label.classList.add("special-prize-label");
    }

    //Titre du label
    const topLine = document.createElement("span");
    topLine.textContent = firstLine;
    topLine.style.fontSize = prize[2];
    topLine.style.lineHeight = "1.1";

    //Sous-titre du label
    const bottomLine = document.createElement("span");
    bottomLine.textContent = secondLine;
    bottomLine.style.fontSize = prize[3];
    bottomLine.style.lineHeight = "1.1";

    label.appendChild(topLine);
    label.appendChild(bottomLine);

    //positionner le label correctement sur chaque quartier de roue
    const angle = index * sectorAngle + sectorAngle / 2;
    const topOffset = wheel.clientWidth * 0.15;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-145px) translateY(-${topOffset}px)`;

    //appliquer
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